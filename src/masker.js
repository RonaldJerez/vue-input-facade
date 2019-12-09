import maskit from './maskit'
import dynamicMask from './dynamic-mask'
import { normalizeConfig } from './core'

// Facade to maskit/dynamicMask when mask is String or Array
export default function(value, config) {
  config = normalizeConfig(config)

  // disable on empty mask
  if (!config.mask) {
    return value
  }

  return Array.isArray(config.mask)
    ? dynamicMask(value, Object.assign({}, config, { masks: config.mask }))
    : maskit(value, config)
}
