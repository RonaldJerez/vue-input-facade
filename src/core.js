import masker from './masker'

export const CONFIG_KEY = '__input-facade__'

export function trigger(name) {
  return new Event(name, { bubbles: true, cancelable: true })
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
  const { target } = event

  // do not run this function is there is no mask config
  if (!target[CONFIG_KEY].config) return false
  // we only need to run this method on native events (isTrusted == true for native events)
  if (!event.isTrusted) return false
  // since we will be emitting our own input event we can stop propagation of the native event
  event.stopPropagation()

  // gather some information from the input before masking
  let cursorPosition = target.selectionEnd
  const isCursorAtEnd = event.data && cursorPosition == target.value.length
  const digit = target.value[cursorPosition - 1] // last inserted digit

  // mask the value based on the config
  updateValue(target, { emit: false })
  updateCursor(target, cursorPosition, isCursorAtEnd, digit)
  target.dispatchEvent(trigger('input'))
}

export function updateCursor(el, cursorPosition, isCursorAtEnd, digit) {
  const display = el.value

  // setSelectionRange applies only to inputs of types text, search, URL, tel and password.
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
  if (!['text', 'tel', 'search'].includes(el.getAttribute('type'))) {
    return
  }

  // set the cursor position to an appropriate location
  if (el === document.activeElement) {
    if (isCursorAtEnd) {
      cursorPosition = display.length
    } else if (digit) {
      let newPosition = cursorPosition
      // if the digit was changed, increment position until find the digit again
      while (newPosition <= display.length && display.charAt(newPosition - 1) !== digit) {
        newPosition++
      }
      // if we didnt find the digit must be a bad digit, leave the cursor where it was
      cursorPosition = newPosition <= display.length ? newPosition : cursorPosition - 1
    }

    el.setSelectionRange(cursorPosition, cursorPosition)
    setTimeout(function() {
      el.setSelectionRange(cursorPosition, cursorPosition)
    }, 0)
  }
}

export function updateValue(el, { emit = true, force = false } = {}) {
  const { config, oldValue } = el[CONFIG_KEY]

  if (force || oldValue !== el.value) {
    const newValue = masker(el.value, config)
    el[CONFIG_KEY].oldValue = el.value = newValue
    emit && el.dispatchEvent(trigger('input'))
  }
}
