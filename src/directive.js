import masker from './masker'

const CONFIG_KEY = '__vueTheMask__'

function trigger(name) {
  return new Event(name, { bubbles: true, cancelable: true })
}

/**
 * Transform an array or string config into an object
 *
 * @param {*} config The mask config object
 */
function getConfig(config = {}) {
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
  updateValue(target, { emit: false })
  updateCursor(target, cursorPosition, isCursorAtEnd, digit)
  target.dispatchEvent(trigger('input'))
}

function updateCursor(el, cursorPosition, isCursorAtEnd, digit) {
  const display = el.value

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

function updateValue(el, { emit = true, force = false } = {}) {
  const { config, oldValue } = el[CONFIG_KEY]

  if (force || oldValue !== el.value) {
    const newValue = masker(el.value, config)
    el[CONFIG_KEY].oldValue = el.value = newValue
    emit && el.dispatchEvent(trigger('input'))
  }
}

export default {
  bind: function(el, binding) {
    el = getInputElement(el)
    el.addEventListener('input', inputHandler, true)

    el[CONFIG_KEY] = {
      config: getConfig(binding.value)
      // TODO: if we set this here it won't try to mask on initial value
      // should this be a default bahaviour?
      // oldValue: el.value
    }

    // set initial value
    updateValue(el)
  },

  update: (el, { value, oldValue }) => {
    el = getInputElement(el)

    if (value != oldValue) {
      el[CONFIG_KEY].config = getConfig(value)
      updateValue(el, { force: true })
    } else if (el.value !== el[CONFIG_KEY].oldValue) {
      updateValue(el)
    }
  },

  unbind: (el) => el.removeEventListener('input', inputHandler, true)
}
