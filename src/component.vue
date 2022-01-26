<template>
  <input
    v-facade="config"
    type="text"
    :value="maskedValue"
    @input="onInput"
    @change="onChange"
    @blur="$emit('blur')"
    @focus="$emit('focus')"
  />
</template>

<script>
import directive from './directive'

/**
 * The component is basically a wrapper around a native input element, as such it inherits all
 * properties available to [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement).
 *
 * However it provides a cleaner and more straight forward interface to the directive's features.
 *
 * @example ../docs/component.md
 */
export default {
  name: 'InputFacade',
  props: {
    /**
     * A function to format the value after applying the mask. The function will receive an
     * object with the masked and unmasked value. The result of this function will determine
     * what happens with the value.
     * <br />
     * If a string is returned, then that string will pass through the masker function once more and its value
     * will be set to the input.  If false (boolean) is returned, the input will be rejected and the
     * previous value will be restored.  Otherwise the facade logic will continue as usual.
     * @since v1.3
     */
    formatter: Function,
    /**
     * Vue's v-model .lazy modifier does not currently work with custom components. If you wish to have your v-model
     * updated only during the change event instead of on input, enable this property. <b>Note: This works by supressing
     * input events and only emitting a single input event at the same time as the change event.</b>
     * @since v1.3
     */
    lazy: {
      type: Boolean,
      default: false
    },
    /**
     * The mask pattern for this input, it could be a single pattern or multiple patterns when its an array.
     */
    mask: [String, Array],
    /**
     * Whether to emit the value masked or unmasked
     */
    masked: {
      type: Boolean,
      default: false
    },
    /**
     * If the mask starts with static charaters, prefill the field with said characters
     * @since v1.3
     */
    prefill: {
      type: Boolean,
      default: false
    },
    /**
     * Keep the value short by not showing static characters until after typing
     * @since v1.3
     */
    short: {
      type: Boolean,
      default: false
    },
    /**
     * Token object to override the defaults with
     */
    tokens: Object,
    /**
     * The input's value
     * @model
     */
    value: [String, Number]
  },
  directives: { facade: directive },
  data() {
    return {
      maskedValue: this.value,
      unmaskedValue: null
    }
  },
  watch: {
    value(newValue) {
      // avoid trigering the directive's update hook when we emit
      // the unmasked value to the parent component
      if (newValue !== this.emittedValue) {
        this.maskedValue = newValue
      }
    },
    mask(newMask) {
      if (!newMask && !this.masked) {
        // when removing the masking rule, set the displayed value to the unmasked
        // to remove any unwanted masking characters from the input
        this.maskedValue = this.unmaskedValue
      }
    },
    masked() {
      this.emitInput()
    }
  },
  computed: {
    config() {
      return {
        mask: this.mask,
        masked: this.masked,
        tokens: this.tokens,
        formatter: this.formatter,
        prefill: this.prefill,
        short: this.short
      }
    },
    emittedValue() {
      return this.mask && this.masked ? this.maskedValue : this.unmaskedValue
    }
  },
  methods: {
    onInput({ target }) {
      this.maskedValue = target.value
      this.unmaskedValue = target.unmaskedValue

      if (!this.lazy) {
        this.emitInput()
      }
    },
    onChange() {
      /**
       * Fires when the value has been commited on the input. Usually on blur.
       * @param {String} value The input's current value, masked or unmasked.
       */
      this.$emit('change', this.emittedValue)

      if (this.lazy) {
        this.emitInput()
      }
    },
    emitInput() {
      /**
       * Fires when the value of the input has been changed.
       * @param {String} value The input's current value, masked or unmasked.
       */
      this.$emit('input', this.emittedValue)
    }
  }
}
</script>
