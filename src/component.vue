<template>
  <input
    v-facade="config"
    type="text"
    :value="maskedValue"
    @input="input"
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
     * The mask pattern for this input
     */
    mask: [String, Array],
    /**
     * Weather to emit the value masked or unmasked
     */
    masked: {
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
      emittedValue: this.value,
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
      if (!newMask) {
        // when removing the masking rule, set the displayed value to the unmasked
        // to remove any unwanted masking characters from the input
        this.maskedValue = this.unmaskedValue
      }
    },
    masked() {
      this.refresh()
    }
  },
  computed: {
    config() {
      return {
        mask: this.mask,
        tokens: this.tokens
      }
    }
  },
  methods: {
    input({ target }) {
      this.maskedValue = target.value
      this.unmaskedValue = target.unmaskedValue
      this.refresh()
    },
    refresh() {
      let newEmittedValue = this.mask && this.masked ? this.maskedValue : this.unmaskedValue

      // avoid unecessary emit when has no change
      if (this.emittedValue !== newEmittedValue) {
        this.emittedValue = newEmittedValue
        /**
         * Input event when the value changes
         * @param {value}
         */
        this.$emit('input', newEmittedValue)
      }
    }
  }
}
</script>
