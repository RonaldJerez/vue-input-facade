import { normalizeConfig } from './core'
import defaultTokens from './tokens'

export function dynamic(value, config = {}) {
  const masks = config.masks.slice().sort((a, b) => a.length - b.length)
  const withConfig = (overrides) => Object.assign({}, config, overrides)

  const nextMaskIsLarger = (currentMask, nextMask) => {
    return formatter(value, withConfig({ mask: nextMask, short: true })).length > currentMask.length
  }

  for (let i = 0; i < masks.length; i++) {
    const currentMask = masks[i]
    const nextMask = masks[i + 1]

    if (!nextMask || !nextMaskIsLarger(currentMask, nextMask)) {
      return formatter(value, withConfig({ mask: currentMask }))
    }
  }

  return '' // empty masks
}

export function formatter(value = '', config = {}) {
  const { mask = '', masked = true, tokens = defaultTokens, short = false } = config

  // ensure we have a string
  value = value.toString()

  let output = ''
  let escaped = false
  let userInput = false

  let valueIndex = 0
  let maskIndex = 0

  while (maskIndex < mask.length) {
    const maskChar = mask[maskIndex]
    const masker = tokens[maskChar]
    const char = value[valueIndex]

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
        userInput = true
        output += masker.transform ? masker.transform(char) : char
        maskIndex++
      }
      valueIndex++
    } else {
      if (masked) output += maskChar
      if (char === maskChar) valueIndex++ // user typed the same char

      escaped = false
      maskIndex++
    }
  }

  return userInput ? output : ''
}

// Facade to formatter/dynamic when mask is String or Array
export default function masker(value, config) {
  config = normalizeConfig(config)

  // disable on empty mask
  if (!config.mask) {
    return value
  }

  return Array.isArray(config.mask)
    ? dynamic(value, Object.assign({}, config, { masks: config.mask }))
    : formatter(value, config)
}
