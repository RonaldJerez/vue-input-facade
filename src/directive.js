import masker from './masker'
import tokens from './tokens'
/* eslint-disable */

function trigger(name) {
  return new Event(name, { bubbles: true, cancelable: true })
}

/**
 * Transform an array or string config into an object
 * 
 * @param {*} config The mask config object
 */
function getConfig(config = {}) {
  config = Array.isArray(config) ? [...config] : config
  if (Array.isArray(config) || typeof config === 'string') {
    config = {
      masked: true,
      mask: config,
      tokens: tokens
    }
  }

  return config
}

/**
 * ensure that the element we're attaching to is an input element
 * if not try to find an input element in this elements childrens
 * 
 * @param {HTMLInputElement} el 
 */
function getInputElement(el) {
  const inputElement = el instanceof HTMLInputElement ? el : el.querySelector('input')

  if (!inputElement) {
    throw new Error('vue-the-mask directive requires at least 1 input element')
  }

  return inputElement
}

/**
 * Input event handler
 * 
 * @param {Event} event The event object
 */
function inputHandler(event) {
  const { target } = event
  
  // we only need to run this method on native events (isTrusted == true for native events)
  // since we will be emitting our own input event we can stop propagation of the native event
  if (!event.isTrusted) return false
  event.stopPropagation()

  // gather some information from the input before masking
  let cursorPosition = target.selectionEnd 
  const isCursorAtEnd = event.data && cursorPosition == target.value.length
  const digit = target.value[cursorPosition - 1] // last inserted digit
  
  // mask the value based on the config
  const config = target.__maskingConfig__
  const display = target.value = masker(target.value, config.mask, config.masked, config.tokens)

  // set the cursor position to an appropriate location
  if (target === document.activeElement) {
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

    target.setSelectionRange(cursorPosition, cursorPosition)
    setTimeout(function() {
      target.setSelectionRange(cursorPosition, cursorPosition)
    }, 0)
  }
  
  target.dispatchEvent(trigger('input'))
}

function updateValue(el) {
  const config = el.__maskingConfig__
  const newValue = masker(el.value, config.mask, config.masked, config.tokens)

  if (newValue !== el.value) {
    el.value = newValue
    el.dispatchEvent(trigger('input'))
  }

  return newValue
}

export default {
  bind: function(el, binding) {
    el = getInputElement(el)
    el.addEventListener('input', inputHandler, true)

    el.__maskingConfig__ = getConfig(binding.value)

    // set initial value
    updateValue(el)
  },

  update: (el, { value, oldValue }) => {
    if (value != oldValue) {
      el = getInputElement(el)
      el.__maskingConfig__ = getConfig(value)
      updateValue(el)
    }
  },

  unbind: (el) => el.removeEventListener('input', inputHandler, true)
}
