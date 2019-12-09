import core, { CONFIG_KEY } from './core'

export default {
  bind: function(el, binding) {
    el = core.getInputElement(el)
    el.addEventListener('input', core.inputHandler, true)

    el[CONFIG_KEY] = {
      config: core.normalizeConfig(binding.value)
      // TODO: if we set this here it won't try to mask on initial value
      // should this be a default bahaviour?
      // oldValue: el.value
    }

    // set initial value
    core.updateValue(el)
  },

  update: (el, { value, oldValue }) => {
    el = core.getInputElement(el)

    if (value != oldValue) {
      el[CONFIG_KEY].config = core.normalizeConfig(value)
      core.updateValue(el, { force: true })
    } else if (el.value !== el[CONFIG_KEY].oldValue) {
      core.updateValue(el)
    }
  },

  unbind: (el) => el.removeEventListener('input', core.inputHandler, true)
}
