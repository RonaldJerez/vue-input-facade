import masker from './masker'
export const CONFIG_KEY = '__input-facade__'

export function FacadeValue(val) {
  this.masked = this.unmasked = val || ''
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
 * @param {object} modifiers An object of modifier flags that can influence the masking process
 */
export function normalizeConfig(config, modifiers) {
  if (Array.isArray(config) || typeof config === 'string') {
    config = { mask: config }
  }

  return Object.assign(config || {}, modifiers)
}

/**
 * ensure that the element we're attaching to is an input element
 * if not try to find an input element in this elements childrens
 *
 * @param {HTMLInputElement} el
 */
export function getInputElement(el) {
  const inputElement = el instanceof HTMLInputElement ? el : el.querySelector('input')

  /* istanbul ignore next */
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
  const { target, detail, inputType } = event

  // We dont need to run this method on the event we emit (prevent event loop)
  if (detail && detail.facade) {
    return false
  }

  // since we will be emitting our own custom input event
  // we can stop propagation of this native event
  event.stopPropagation()

  // Ignore input events related to composition, specific composition
  // events will handle updating the input after text is composed
  if (['insertCompositionText', 'insertFromComposition'].includes(inputType)) {
    return false
  }

  const originalValue = target.value
  const originalPosition = target.selectionEnd
  const { oldValue } = target[CONFIG_KEY]

  updateValue(target, null, { emit: false }, event)
  updateCursor(event, originalValue, originalPosition)

  if (oldValue !== target.value) {
    target.dispatchEvent(FacadeInputEvent())
  }
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

  // if event.inputType is not supported, assume 'insertText'
  const inputType = event.inputType || 'insertText'

  // get some information about the cursor based on the original value
  const isInsertEvent = ['insertText', 'insertFromPaste'].includes(inputType)
  const wasCursorAtEnd = isInsertEvent && originalPosition == originalValue.length
  let lastInsertedChar = isInsertEvent && originalValue[originalPosition - 1]

  const newValue = target.value.toLocaleLowerCase()

  // set the cursor position to an appropriate location
  let cursorPosition = originalPosition
  if (wasCursorAtEnd) {
    cursorPosition = newValue.length
  } else if (lastInsertedChar) {
    lastInsertedChar = lastInsertedChar.toLocaleLowerCase()

    let newPosition = cursorPosition
    // if the last inserted char was changed, increment position until find it again
    while (newPosition <= newValue.length && newValue.charAt(newPosition - 1) !== lastInsertedChar) {
      newPosition++
    }
    // if we didnt find the digit must be an unacceptable char, leave the cursor where it was
    cursorPosition = newPosition <= newValue.length ? newPosition : cursorPosition - 1
  }

  target.setSelectionRange(cursorPosition, cursorPosition)
  setTimeout(function() {
    /* istanbul ignore next */
    target.setSelectionRange(cursorPosition, cursorPosition)
  }, 0)
}

/**
 * Updates the element's value and unmasked value based on the masking config rules
 *
 * @param {HTMLInputElement} el The input element to update
 * @param {object} [options]
 * @param {Boolean} options.emit Wether to dispatch a new InputEvent or not
 * @param {Boolean} options.force Forces the update even if the old value and the new value are the same
 * @param {Event} [event] The event that triggered this this update, null if not triggered by an input event
 */
export function updateValue(el, vnode, { emit = true, force = false } = {}, event) {
  let { config, oldValue, isComposing } = el[CONFIG_KEY]
  let currentValue = vnode && vnode.data.model ? vnode.data.model.value : el.value

  // manipulating input value while text is being composed can lead to inputs being duplicated
  if (isComposing) {
    return
  }

  oldValue = oldValue || ''
  currentValue = currentValue || ''

  if (force || oldValue !== currentValue) {
    let newValue = masker(currentValue, config)

    if (event && typeof config.formatter === 'function') {
      const formattedValue = config.formatter(newValue, event)

      if (typeof formattedValue === 'string') {
        newValue = masker(formattedValue, config)
      } else if (formattedValue === false) {
        el.value = oldValue
        return
      }
    }

    el[CONFIG_KEY].oldValue = newValue.masked
    el.unmaskedValue = newValue.unmasked

    // safari makes the cursor jump to the end if el.value gets assign even if to the same value
    if (el.value !== newValue.masked) {
      el.value = newValue.masked
    }

    // this part needs to be outside the above IF statement for vuetify in firefox
    // drawback is that we endup with two's input events in firefox
    emit && el.dispatchEvent(FacadeInputEvent())
  }
}
