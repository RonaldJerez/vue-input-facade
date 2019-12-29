import masker from './masker'
export const CONFIG_KEY = '__input-facade__'

export function FacadeValue(val = '') {
  this.masked = this.raw = val
}

/**
 * Creates a CustomEvent('input') with detail = { facade: true }
 * used as a way to identify our own input event
 */
export function FacadeInputEvent() {
  return new CustomEvent('input', {
    bubbles: true,
    cancelable: true,
    detail: { facade: true }
  })
}

/**
 * Transform an array or string config into an object
 *
 * @param {object} config The mask config object
 */
export function normalizeConfig(config = {}) {
  if (Array.isArray(config) || typeof config === 'string') {
    config = { mask: config }
  }

  return config
}

/**
 * ensure that the element we're attaching to is an input element
 * if not try to find an input element in this elements childrens
 *
 * @param {HTMLInputElement} el
 */
export function getInputElement(el) {
  const inputElement = el instanceof HTMLInputElement ? el : el.querySelector('input')

  if (!inputElement) {
    throw new Error('facade directive requires an input element')
  }

  return inputElement
}

/**
 * Input event handler
 *
 * @param {Event} event The event object
 */
export function inputHandler(event) {
  const { target, detail } = event

  // We dont need to run this method on the event we emit (prevent event loop)
  if (detail && detail.facade) {
    return false
  }

  // since we will be emitting our own custom input event
  // we can stop propagation of this native event
  event.stopPropagation()

  const originalValue = target.value
  const originalPosition = target.selectionEnd

  updateValue(target, { emit: false })
  updateCursor(event, originalValue, originalPosition)
  target.dispatchEvent(FacadeInputEvent())
}

/**
 * Updates the cursor position to the right place after the masking rule was applied
 * 
 * @param {InputEvent} event the event that trigger this update
 * @param {String} originalValue the original input value, prior to masking
 * @param {Number} originalPosition the original cursor position 
 */
export function updateCursor(event, originalValue, originalPosition) {
  const { target } = event

  // setSelectionRange applies only to inputs of types text, search, URL, tel and password.
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
  const supportedInputType = ['text', 'tel', 'search', null].includes(target.getAttribute('type'))
  const config = target[CONFIG_KEY] && target[CONFIG_KEY].config
  if (target !== document.activeElement || !supportedInputType || !config.mask) {
    return
  }

  // get some information about the cursor based on the original value
  const pasting = event.inputType === 'insertFromPaste'
  const isCursorAtEnd = (event.data || pasting) && originalPosition == originalValue.length
  let insertedChar = originalValue[originalPosition - 1]

  const newValue = target.value.toLocaleLowerCase()

  // set the cursor position to an appropriate location
  let cursorPosition = originalPosition
  if (isCursorAtEnd) {
    cursorPosition = newValue.length
  } else if (insertedChar) {
    insertedChar = insertedChar.toLocaleLowerCase()

    let newPosition = cursorPosition
    // if the last inserted char was changed, increment position until find it again
    while (newPosition <= newValue.length && newValue.charAt(newPosition - 1) !== insertedChar) {
      newPosition++
    }
    // if we didnt find the digit must be an unacceptable char, leave the cursor where it was
    cursorPosition = newPosition <= newValue.length ? newPosition : cursorPosition - 1
  }

  target.setSelectionRange(cursorPosition, cursorPosition)
  setTimeout(function() {
    target.setSelectionRange(cursorPosition, cursorPosition)
  }, 0)
}

/**
 * Updates the element's value and unmasked value based on the masking config rules
 * 
 * @param {HTMLInputElement} el The input element to update
 * @param {object} options 
 * @param {Boolean} options.emit Wether to dispatch a new InputEvent or not
 * @param {Boolean} options.force Forces the update even if the old value and the new value are the same 
 */
export function updateValue(el, { emit = true, force = false } = {}) {
  const { config, oldValue } = el[CONFIG_KEY]

  if (force || oldValue !== el.value) {
    const newValue = masker(el.value, config)

    el[CONFIG_KEY].oldValue = newValue.masked
    el.value = newValue.masked
    el.unmaskedValue = newValue.raw
    emit && el.dispatchEvent(FacadeInputEvent())
  }
}
