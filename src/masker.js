import { normalizeConfig, FacadeValue } from './core'
import defaultTokens from './tokens'

let tokenDefinitions = defaultTokens

/**
 * Overrides the default global token definitions
 *
 * @param {object} tokens the new token object
 */
export function setTokens(tokens) {
  if (!tokens) return
  tokenDefinitions = tokens
}

/**
 * Given an array of masks, determines which one is the appropriate one based on the value
 *
 * @param {String} inputValue the inputValue value to mask
 * @param {object} config
 * @param {Array} config.masks the list of masks to choose from
 * @returns {FacadeValue} facade value object
 */
export function dynamic(inputValue, config) {
  const masks = config.masks.slice().sort((a, b) => a.length - b.length)
  const withConfig = (overrides) => Object.assign({}, config, overrides)

  // this method will choose a facade based on which one exposes more data from the input
  const chooseBestFacade = (currentValue, nextMask) => {
    const nextValue = formatter(inputValue, withConfig({ mask: nextMask }))
    const currentLength = currentValue.unmasked.length
    const nextLength = nextValue.unmasked.length
    return nextLength > currentLength ? nextValue : currentValue
  }

  // empty masks array
  if (!masks.length) {
    return new FacadeValue()
  }

  const firstMask = masks.shift()
  let output = formatter(inputValue, withConfig({ mask: firstMask }))

  while (masks.length) {
    const nextMask = masks.shift()
    output = chooseBestFacade(output, nextMask)
  }

  return output
}

/**
 * Formats the value based on the given masking rule
 *
 * @param {string} value the value to mask
 * @param {object} config
 * @param {string} config.mask the masking string
 * @param {object} config.tokens the tokens to add/override to the global
 * @param {boolean} config.prefill whether or not to add masking characters to the input before the user types
 * @param {boolean} config.short to keep the string as short as possible (not append extra chars at the end)
 */
export function formatter(value, config) {
  let { mask = '', tokens, prefill = false, short = false } = config

  // append/override global tokens instead of complete override
  tokens = tokens ? Object.assign({}, tokenDefinitions, tokens) : tokenDefinitions

  let output = new FacadeValue()
  let escaped = false
  let optional = false

  let valueIndex = 0
  let maskIndex = 0
  let accumulator = ''

  while (maskIndex < mask.length) {
    const maskChar = mask[maskIndex]
    const masker = tokens[maskChar]
    const nextMaskChar = mask[maskIndex + 1]
    const nextMasker = tokens[nextMaskChar]
    let char = value[valueIndex]

    // no more input characters and next character is a masked one
    if (!char && masker) break

    if (masker && !escaped) {
      // when is escape char, do not mask, just continue
      if (masker.escape) {
        escaped = true
        maskIndex++
        continue
      }

      if (masker.optional || (nextMasker && nextMasker.optional)) {
        optional = true
      }

      if (masker.pattern && masker.pattern.test(char)) {
        char = masker.transform ? masker.transform(char) : char
        output.unmasked += char
        output.masked += accumulator + char

        accumulator = ''
        maskIndex++
        optional = false
      }

      if (optional) {
        optional = false
        maskIndex++
        continue
      }

      valueIndex++
    } else {
      accumulator += maskChar
      if ((char && char.toLocaleLowerCase()) === (maskChar && maskChar.toLocaleLowerCase())) {
        // user typed the same char as static mask char
        valueIndex++
        if (!masker || escaped) {
          // add it and reset
          output.masked += accumulator
          accumulator = ''
        }
      }

      optional = false
      escaped = false
      maskIndex++
    }
  }

  // if there is no unmasked value, set masked to empty to avoid showing masking
  // characters in an otherwise empty input, unless prefill is set ot true
  if ((prefill && !output.unmasked) || (!short && output.unmasked)) {
    output.masked += accumulator
  }

  return output
}

/**
 * Facade to formatter/dynamic when mask is String or Array
 *
 * @param {String} value the value to mask
 * @param {*} config the masking config
 * @returns {FacadeValue} facade value object
 */
export default function masker(value, config) {
  // ensure we have proper input
  value = (value || '').toString()
  config = normalizeConfig(config)

  // disable on empty mask
  if (!config.mask) {
    return new FacadeValue(value)
  }

  return Array.isArray(config.mask)
    ? dynamic(value, Object.assign({}, config, { masks: config.mask }))
    : formatter(value, config)
}