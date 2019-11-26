import maskit from './maskit'
import dynamicMask from './dynamic-mask'

// Facade to maskit/dynamicMask when mask is String or Array
export default function(value, mask, masked, tokens) {
  // disable on empty mask
  if (!mask) {
    return value
  }

  return Array.isArray(mask)
    ? dynamicMask(value, { masks: mask, masked, tokens })
    : maskit(value, { mask, masked, tokens })
}
