import maskit from './maskit'

export default function dynamicMask(value, config = {}) {
  const masks = config.masks.slice().sort((a, b) => a.length - b.length)
  const withConfig = (overrides) => Object.assign({}, config, overrides)

  const nextMaskIsLarger = (currentMask, nextMask) => {
    return maskit(value, withConfig({ mask: nextMask, short: true })).length > currentMask.length
  }

  for (let i = 0; i < masks.length; i++) {
    const currentMask = masks[i]
    const nextMask = masks[i + 1]

    if (!nextMask || !nextMaskIsLarger(currentMask, nextMask)) {
      return maskit(value, withConfig({ mask: currentMask }))
    }
  }

  return '' // empty masks
}
