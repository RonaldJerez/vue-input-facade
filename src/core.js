import masker from './masker'
export const CONFIG_KEY = '__input-facade__'

export function FacadeValue(val = '') {
  this.masked = this.raw = val
}

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
 * @param {*} config The mask config object
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

export function updateCursor(event, originalValue, originalPosition) {
  const { target } = event

  // setSelectionRange applies only to inputs of types text, search, URL, tel and password.
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
  if (target !== document.activeElement || !['text', 'tel', 'search', null].includes(target.getAttribute('type'))) {
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
