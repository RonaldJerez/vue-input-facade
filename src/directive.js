import * as core from './core'
const CONFIG_KEY = core.CONFIG_KEY

export default {
  bind: (el, { value, modifiers }, vnode) => {
    el = core.getInputElement(el)
    const config = core.normalizeConfig(value, modifiers)
    el[CONFIG_KEY] = { config }

    // set initial value
    core.updateValue(el, vnode, { force: config.prefill })
  },

  inserted: (el) => {
    el = core.getInputElement(el)
    const config = el[CONFIG_KEY]
    // prefer adding event listener to parent element to avoid Firefox bug which does not
    // execute `useCapture: true` event handlers before non-capturing event handlers
    const handlerOwner = el.parentElement || el

    // use anonymous event handler to avoid inadvertently removing masking for all inputs within a container
    const handler = (e) => {
      if (e.target !== el) {
        return
      }
      core.inputHandler(e, el)
    }

    const compositionHandler = (e) => {
      if (e.target !== el) {
        return
      }

      if (['compositionstart', 'compositionupdate'].includes(e.type)) {
        el[CONFIG_KEY].isComposing = true
      } else if (e.type === 'compositionend') {
        el[CONFIG_KEY].isComposing = false
        core.inputHandler(e, el)
      }
    }

    handlerOwner.addEventListener('input', handler, true)
    handlerOwner.addEventListener('compositionstart', compositionHandler, true)
    handlerOwner.addEventListener('compositionupdate', compositionHandler, true)
    handlerOwner.addEventListener('compositionend', compositionHandler, true)

    config.cleanup = () => {
      handlerOwner.removeEventListener('input', handler, true)
      handlerOwner.removeEventListener('compositionstart', compositionHandler, true)
      handlerOwner.removeEventListener('compositionend', compositionHandler, true)
      handlerOwner.removeEventListener('compositionupdate', compositionHandler, true)
    }
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

  unbind: (el) => {
    core.getInputElement(el)[CONFIG_KEY].cleanup()
  }
}
