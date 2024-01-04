declare const _default: import('../vue/dist/vue.esm-bundler.js').DefineComponent<{
    /**
     * A function to format the value after applying the mask. The function will receive an
     * object with the masked and unmasked value. The result of this function will determine
     * what happens with the value.
     * <br />
     * If a string is returned, then that string will pass through the masker function once more and its value
     * will be set to the input. If false (boolean) is returned, the input will be rejected and the
     * previous value will be restored. Otherwise the facade logic will continue as usual.
     * @since v1.3
     */
    formatter: {
        type: FunctionConstructor;
        default: null;
    };
    /**
     * The mask pattern for this input, it could be a single pattern or multiple patterns when its an array.
     */
    mask: {
        type: (ArrayConstructor | StringConstructor)[];
        default: null;
    };
    /**
     * Whether to emit the value masked or unmasked
     */
    masked: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * If the mask starts with static charaters, prefill the field with said characters
     * @since v1.3
     */
    prefill: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Keep the value short by not showing static characters until after typing
     * @since v1.3
     */
    short: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Token object to override the defaults with
     */
    tokens: {
        type: ObjectConstructor;
        default: () => {};
    };
    /**
     * The input's value
     * @model
     */
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    modelModifiers: {
        type: ObjectConstructor;
        default: () => {};
    };
}, any, {
    maskedValue: string | number;
    unmaskedValue: null;
}, {
    config(): {
        mask: any;
        masked: any;
        tokens: any;
        formatter: any;
        prefill: any;
        short: any;
    };
    emittedValue(): string | number | null;
}, {
    onInput({ target }: {
        target: any;
    }): void;
    onChange(): void;
    emitInput(): void;
}, import('../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("update:model-value" | "change" | "keydown" | "keyup" | "paste")[], "update:model-value" | "change" | "keydown" | "keyup" | "paste", import('../vue/dist/vue.esm-bundler.js').VNodeProps & import('../vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('../vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('../vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    /**
     * A function to format the value after applying the mask. The function will receive an
     * object with the masked and unmasked value. The result of this function will determine
     * what happens with the value.
     * <br />
     * If a string is returned, then that string will pass through the masker function once more and its value
     * will be set to the input. If false (boolean) is returned, the input will be rejected and the
     * previous value will be restored. Otherwise the facade logic will continue as usual.
     * @since v1.3
     */
    formatter: {
        type: FunctionConstructor;
        default: null;
    };
    /**
     * The mask pattern for this input, it could be a single pattern or multiple patterns when its an array.
     */
    mask: {
        type: (ArrayConstructor | StringConstructor)[];
        default: null;
    };
    /**
     * Whether to emit the value masked or unmasked
     */
    masked: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * If the mask starts with static charaters, prefill the field with said characters
     * @since v1.3
     */
    prefill: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Keep the value short by not showing static characters until after typing
     * @since v1.3
     */
    short: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Token object to override the defaults with
     */
    tokens: {
        type: ObjectConstructor;
        default: () => {};
    };
    /**
     * The input's value
     * @model
     */
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    modelModifiers: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & {
    "onUpdate:model-value"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onKeydown?: ((...args: any[]) => any) | undefined;
    onKeyup?: ((...args: any[]) => any) | undefined;
    onPaste?: ((...args: any[]) => any) | undefined;
}, {
    mask: string | unknown[];
    tokens: Record<string, any>;
    prefill: boolean;
    short: boolean;
    formatter: Function;
    masked: boolean;
    modelValue: string | number;
    modelModifiers: Record<string, any>;
}, {}>;
export default _default;
