import tokens from './tokens'
import masker, { setTokens } from './masker'
import facade from './directive'
import InputFacade from './component.vue'

/**
 * Vue plugin definittion
 *
 * @param {Vue} Vue the vue instance
 * @param {Object} options.tokens the tokens to use as global tokens
 * @param {Object} options.name the tokens to use as global tokens
 */
function install(Vue, options = {}) {
  // override the default tokens
  if (options.tokens) {
    setTokens(options.tokens)
  }

  Vue.component(InputFacade.name, InputFacade)
  Vue.directive(options.name || 'facade', facade)
  Vue.filter(options.name || 'facade', filter)
}

function filter(value, config) {
  return masker(value, config).masked
}

export default install
export { InputFacade, facade, tokens, masker, filter }

// Install by default if included from script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}
