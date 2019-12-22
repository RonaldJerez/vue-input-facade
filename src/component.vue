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
    /**
     * Input event when the value changes
     *
     * @event input
     * @type {string}
     */
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
        this.$emit('input', newEmittedValue)
      }
    }
  }
}
</script>
