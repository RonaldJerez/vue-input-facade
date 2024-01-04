export function FacadeValue(val: any): void;
export class FacadeValue {
    constructor(val: any);
    masked: any;
    unmasked: any;
}
/**
 * Creates a CustomEvent('input') with detail = { facade: true }
 * used as a way to identify our own input event
 */
export function FacadeInputEvent(): CustomEvent<{
    facade: boolean;
}>;
/**
 * Transform an array or string config into an object
 *
 * @param {object} config The mask config object
 * @param {object} modifiers An object of modifier flags that can influence the masking process
 */
export function normalizeConfig(config: object, modifiers: object): object;
/**
 * ensure that the element we're attaching to is an input element
 * if not try to find an input element in this elements childrens
 *
 * @param {HTMLInputElement} el
 */
export function getInputElement(el: HTMLInputElement): any;
/**
 * Input event handler
 *
 * @param {Event} event The event object
 * @param {HTMLInputElement} el The input element
 */
export function inputHandler(event: Event, el: HTMLInputElement): false | undefined;
/**
 * Updates the cursor position to the right place after the masking rule was applied
 *
 * @param {InputEvent} event the event that trigger this update
 * @param {String} originalValue the original input value, prior to masking
 * @param {Number} originalPosition the original cursor position
 */
export function updateCursor(event: InputEvent, originalValue: string, originalPosition: number): void;
/**
 * Updates the element's value and unmasked value based on the masking config rules
 *
 * @param {HTMLInputElement} el The input element to update
 * @param {object} [options]
 * @param {Boolean} options.emit Wether to dispatch a new InputEvent or not
 * @param {Boolean} options.force Forces the update even if the old value and the new value are the same
 * @param {Event} [event] The event that triggered this this update, null if not triggered by an input event
 */
export function updateValue(el: HTMLInputElement, vnode: any, { emit, force }?: Event | undefined, event?: Event | undefined): void;
export const CONFIG_KEY: "__input-facade__";
