import maskit from './maskit'

export default function dynamicMask (value, masks, masked, tokens) {
  masks = masks.slice().sort((a, b) => a.length - b.length)

  for (let i = 0; i < masks.length; i++) {
    const currentMask = masks[i]
    const nextMask = masks[i+1]

    if ( !(nextMask && maskit(value, nextMask, masked, tokens).length > currentMask.length) ) {
      return maskit(value, currentMask, masked, tokens)
    }
  }

  return '' // empty masks
}
