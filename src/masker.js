import { normalizeConfig, FacadeValue } from './core'
import defaultTokens from './tokens'

let tokenDefinitions = defaultTokens

let isLocaleCompareSupported = false
try {
  // if supported this will throw a RangeError because 'i' is not a valid locale
  'a'.localeCompare('b', 'i')
} catch (e) {
  isLocaleCompareSupported = e.name === 'RangeError'
}

/**
 * Overrides the default global token definitions
 *
 * @param {object} tokens the new token object
 */
export function setTokens(tokens) {
  /* istanbul ignore if */
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

  let valueIndex = 0
  let maskIndex = 0
  let accumulator = ''

  // gets some information about the mask before formating
  function getMetaData(masker) {
    const nextMaskChar = mask[maskIndex + 1]
    const nextMasker = tokens[nextMaskChar]

    return {
      escape: !!masker?.escape,
      optional: !!nextMasker?.optional,
      repeat: !!nextMasker?.repeat,
      ...(nextMasker?.pipe && {
        pipe: mask
          .substring(maskIndex)
          .match(/^(.\|)+./g)[0]
          .split('|')
      })
    }
  }

  while (maskIndex < mask.length) {
    const maskChar = mask[maskIndex]
    const masker = tokens[maskChar]
    let char = value[valueIndex]

    const meta = getMetaData(masker)

    if (masker && !escaped && !meta.pipe) {
      // when is escape char, do not mask, just continue
      if (meta.escape) {
        escaped = true
        maskIndex++
        continue
      }

      // no more input characters and next character is a masked one
      if (!char) break

      if (masker.pattern?.test(char)) {
        char = masker.transform?.(char) || char
        output.unmasked += char
        output.masked += accumulator + char

        accumulator = ''

        if (!meta.repeat) {
          maskIndex += meta.optional ? 2 : 1
        }
      } else if (meta.optional || meta.repeat) {
        maskIndex += 2
        continue
      }

      valueIndex++
    } else if (meta.pipe) {
      if (!char) break

      const pipeMatch = meta.pipe.find(looselyStringMatch.bind(null, char))

      if (pipeMatch) {
        output.unmasked += pipeMatch
        output.masked += accumulator + pipeMatch

        maskIndex += meta.pipe.length * 2 - 1
        accumulator = ''
      }

      valueIndex++
    } else {
      if (looselyStringMatch(char, maskChar)) {
        // user typed the same char as static mask char
        output.masked += accumulator + maskChar
        valueIndex++
        accumulator = ''

        if (meta.optional) {
          output.unmasked += maskChar
        }
      } else if (!meta.optional) {
        accumulator += maskChar
      }

      escaped = false
      maskIndex += meta.optional ? 2 : 1
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
 * Loosely compare two strings and returns if they are equal ignoring case and locale
 * specific accents. Some browsers do not fully support this (Android webview and opera)
 * so we fallback to just ignoring casing in those cases.
 *
 * @see [MDM - LocaleCompare](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
 *
 * @param {String} str1 String one
 * @param {String} str2 String two
 * @returns Boolean
 */
export function looselyStringMatch(str1, str2) {
  /* istanbul ignore else */
  if (isLocaleCompareSupported) {
    return str1?.localeCompare(str2, undefined, { sensitivity: 'base' }) === 0
  } else {
    return str1?.toLocaleLowerCase() === str2?.toLocaleLowerCase()
  }
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
