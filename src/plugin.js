import tokens from './tokens'
import masker, { setTokens } from './masker'
import facade from './directive'
import InputFacade from './component.vue'

const plugin = {
  /**
   * Vue plugin definition
   *
   * @param {Vue} app the app instance
   * @param {Object} options.tokens the tokens to use as global tokens
   * @param {Object} options.name the tokens to use as global tokens
   */
  install(app, options = {}) {
    // override the default tokens
    if (options.tokens) {
      setTokens(options.tokens)
    }

    app.component(InputFacade.name, InputFacade)
    app.directive(options.name || 'facade', facade)
  }
}

export { InputFacade, facade, tokens, masker, plugin }

// Install by default if included from script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
