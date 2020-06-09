import * as core from './core'
const CONFIG_KEY = core.CONFIG_KEY

export default {
  bind: (el, { value, modifiers }, vnode) => {
    el = core.getInputElement(el)
    el.addEventListener('input', core.inputHandler, true)

    el[CONFIG_KEY] = {
      config: core.normalizeConfig(value, modifiers)
    }

    // set initial value
    core.updateValue(el, vnode)
  },

  update: (el, { value, oldValue, modifiers }, vnode) => {
    el = core.getInputElement(el)

    if (value !== oldValue) {
      el[CONFIG_KEY].config = core.normalizeConfig(value, modifiers)
      core.updateValue(el, vnode, { force: true })
    } else {
      core.updateValue(el, vnode)
    }
  },

  unbind: (el) => el.removeEventListener('input', core.inputHandler, true)
}
