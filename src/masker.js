import { normalizeConfig, FacadeValue } from './core'
import defaultTokens from './tokens'

let tokenDefinitions = defaultTokens

export function setTokens(tokens) {
  tokenDefinitions = tokens
}

export function dynamic(value, config = {}) {
  const masks = config.masks.slice().sort((a, b) => a.length - b.length)
  const withConfig = (overrides) => Object.assign({}, config, overrides)

  const nextFacadeIsLarger = (currentMask, nextMask) => {
    const nextMaskedVal = formatter(value, withConfig({ mask: nextMask, short: true }))
    return nextMaskedVal.masked.length > currentMask.length
  }

  for (let i = 0; i < masks.length; i++) {
    const currentMask = masks[i]
    const nextMask = masks[i + 1]

    if (!nextMask || !nextFacadeIsLarger(currentMask, nextMask)) {
      return formatter(value, withConfig({ mask: currentMask }))
    }
  }

  return new FacadeValue() // empty masks
}

export function formatter(value = '', config = {}) {
  let { mask = '', tokens, short = false } = config

  // append/override global tokens instead of complete override
  tokens = tokens ? Object.assign({}, tokenDefinitions, tokens) : tokenDefinitions

  // ensure we have a string
  value = value.toString()

  let output = new FacadeValue()
  let escaped = false

  let valueIndex = 0
  let maskIndex = 0
  let accumulator = ''

  while (maskIndex < mask.length) {
    const maskChar = mask[maskIndex]
    const masker = tokens[maskChar]
    let char = value[valueIndex]

    // no more input charactors and next charactor is a masked char
    if (!char && (short || masker)) break

    if (masker && !escaped) {
      // when is escape char, do not mask, just continue
      if (masker.escape) {
        escaped = true
        maskIndex++
        continue
      }

      if (masker.pattern.test(char)) {
        char = masker.transform ? masker.transform(char) : char
        output.raw += char
        output.masked += accumulator + char

        accumulator = ''
        maskIndex++
      }
      valueIndex++
    } else {
      accumulator += maskChar
      if (char === maskChar) valueIndex++ // user typed the same char

      escaped = false
      maskIndex++
    }
  }

  // if there is no raw value, set masked to empty to avoid
  // showing masking characters in an otherwise empty input
  if (output.raw && !short) {
    output.masked += accumulator
  }

  return output
}

// Facade to formatter/dynamic when mask is String or Array
export default function masker(value, config) {
  config = normalizeConfig(config)

  // disable on empty mask
  if (!config.mask) {
    return new FacadeValue(value)
  }

  return Array.isArray(config.mask)
    ? dynamic(value, Object.assign({}, config, { masks: config.mask }))
    : formatter(value, config)
}
