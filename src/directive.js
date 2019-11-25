import masker from './masker'
import tokens from './tokens'

// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#The_old-fashioned_way
function event (name) {
  var evt = document.createEvent('Event')
  evt.initEvent(name, true, true)
  return evt
}

export default function (el, binding) {
  var config = binding.value || {}
  if (Array.isArray(config) || typeof config === 'string') {
    config = {
      masked: true,
      mask: config,
      tokens: tokens
    }
  }

  if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
    var els = el.getElementsByTagName('input')
    if (els.length !== 1) {
      throw new Error("v-mask directive requires 1 input, found " + els.length)
    } else {
      el = els[0]
    }
  }

  el.oninput = function ({isTrusted, data}) {
    if (!isTrusted) return // avoid infinite loop

    // by default, keep cursor at same position as before the mask
    var position = el.selectionEnd
    let cursorAtEnd = data && position == el.value.length
    // save the character just inserted
    var digit = el.value[position-1]
    el.value = masker(el.value, config.mask, config.masked, config.tokens)

    if (el === document.activeElement) {
      if (cursorAtEnd) {
        position = el.value.length
      } else if (digit) {
        let newPosition = position
        // if the digit was changed, increment position until find the digit again
        while (newPosition <= el.value.length && el.value.charAt(newPosition-1) !== digit) {
          newPosition++
        }
        // if we didnt find the digit must be a bad digit, leave the cursor where it was
        position = newPosition <= el.value.length ? newPosition : position - 1
      }

      el.setSelectionRange(position, position)
      setTimeout(function () {
        el.setSelectionRange(position, position)
      }, 0)
    }
    el.dispatchEvent(event('input'))
  }

  var newDisplay = masker(el.value, config.mask, config.masked, config.tokens)
  if (newDisplay !== el.value) {
    el.value = newDisplay
    el.dispatchEvent(event('input'))
  }
}
