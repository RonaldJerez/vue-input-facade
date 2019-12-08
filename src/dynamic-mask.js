import maskit from './maskit'

export default function dynamicMask(value, config = {}) {
  const masks = config.masks.slice().sort((a, b) => a.length - b.length)

  for (let i = 0; i < masks.length; i++) {
    const currentMask = masks[i]
    const nextMask = masks[i + 1]

    if (
      !(
        nextMask &&
        maskit(value, Object.assign({}, config, { mask: nextMask, short: true })).length > currentMask.length
      )
    ) {
      return maskit(value, Object.assign(config, { mask: currentMask }))
    }
  }

  return '' // empty masks
}
