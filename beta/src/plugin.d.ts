import InputFacade from './component.vue';
import facade from './directive';
import tokens from './tokens';
import masker from './masker';
export namespace plugin {
    /**
     * Vue plugin definition
     *
     * @param {Vue} app the app instance
     * @param {Object} options.tokens the tokens to use as global tokens
     * @param {Object} options.name the tokens to use as global tokens
     */
    function install(app: Vue, options?: {}): void;
}
export { InputFacade, facade, tokens, masker };
