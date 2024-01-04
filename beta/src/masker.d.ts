/**
 * Overrides the default global token definitions
 *
 * @param {object} tokens the new token object
 */
export function setTokens(tokens: object): void;
/**
 * Given an array of masks, determines which one is the appropriate one based on the value
 *
 * @param {String} inputValue the inputValue value to mask
 * @param {object} config
 * @param {Array} config.masks the list of masks to choose from
 * @returns {FacadeValue} facade value object
 */
export function dynamic(inputValue: string, config: {
    masks: any[];
}): FacadeValue;
/**
 * Formats the value based on the given masking rule
 *
 * @param {string} value the value to mask
 * @param {object} config
 * @param {string} config.mask the masking string
 * @param {object} config.tokens the tokens to add/override to the global
 * @param {boolean} config.prefill whether or not to add masking characters to the input before the user types
 * @param {boolean} config.short to keep the string as short as possible (not append extra chars at the end)
 */
export function formatter(value: string, config: {
    mask: string;
    tokens: object;
    prefill: boolean;
    short: boolean;
}): FacadeValue;
/**
 * Loosely compare two strings and returns if they are equal ignoring case and locale
 * specific accents. Some browsers do not fully support this (Android webview and opera)
 * so we fallback to just ignoring casing in those cases.
 *
 * @see [MDM - LocaleCompare](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
 *
 * @param {String} str1 String one
 * @param {String} str2 String two
 * @returns Boolean
 */
export function looselyStringMatch(str1: string, str2: string): boolean;
/**
 * Facade to formatter/dynamic when mask is String or Array
 *
 * @param {String} value the value to mask
 * @param {*} config the masking config
 * @returns {FacadeValue} facade value object
 */
export default function masker(value: string, config: any): FacadeValue;
import { FacadeValue } from './core';
