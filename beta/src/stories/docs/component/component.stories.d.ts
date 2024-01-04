import type { StoryObj } from '@storybook/vue3';
import InputFacade from '../../../component.vue';
declare const meta: {
    title: string;
    component: import('../../../../vue/dist/vue.esm-bundler.js').DefineComponent<{
        formatter: {
            type: FunctionConstructor;
            default: null;
        };
        mask: {
            type: (ArrayConstructor | StringConstructor)[];
            default: null;
        };
        masked: {
            type: BooleanConstructor;
            default: boolean;
        };
        prefill: {
            type: BooleanConstructor;
            default: boolean;
        };
        short: {
            type: BooleanConstructor;
            default: boolean;
        };
        tokens: {
            type: ObjectConstructor;
            default: () => {};
        };
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
    }, import('../../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("update:model-value" | "change" | "keydown" | "keyup" | "paste")[], "update:model-value" | "change" | "keydown" | "keyup" | "paste", import('../../../../vue/dist/vue.esm-bundler.js').VNodeProps & import('../../../../vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('../../../../vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('../../../../vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
        formatter: {
            type: FunctionConstructor;
            default: null;
        };
        mask: {
            type: (ArrayConstructor | StringConstructor)[];
            default: null;
        };
        masked: {
            type: BooleanConstructor;
            default: boolean;
        };
        prefill: {
            type: BooleanConstructor;
            default: boolean;
        };
        short: {
            type: BooleanConstructor;
            default: boolean;
        };
        tokens: {
            type: ObjectConstructor;
            default: () => {};
        };
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
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof InputFacade>;
export declare const BasicUsage: Story;
export declare const OptionalCharacter: Story;
export declare const RepeatingCharacter: Story;
export declare const AlternationPipe: Story;
export declare const DynamicMasks: Story;
export declare const CustomTokens: Story;
export declare const PostMaskingInputFormatterString: Story;
export declare const PostMaskingInputFormatterBoolean: Story;
