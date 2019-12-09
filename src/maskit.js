import defaultTokens from './tokens'

export default function maskit(value = '', config = {}) {
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
