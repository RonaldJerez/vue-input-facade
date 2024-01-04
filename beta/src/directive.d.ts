declare namespace _default {
    function beforeMount(el: any, { value, modifiers }: {
        value: any;
        modifiers: any;
    }, vnode: any): void;
    function mounted(el: any): void;
    function updated(el: any, { value, oldValue, modifiers }: {
        value: any;
        oldValue: any;
        modifiers: any;
    }, vnode: any): void;
    function unmounted(el: any): void;
}
export default _default;
