<template>
  <input v-facade="config" type="text" :value="value" @input="input" @blur="$emit('blur')" @focus="$emit('focus')" />
</template>

<script>
import directive from './directive'

export default {
  name: 'InputFacade',
  props: {
    /**
     * Weather to emit the value masked or not
     */
    masked: {
      type: Boolean,
      default: false
    },
    mask: [String, Array],
    tokens: Object,
    value: [String, Number]
  },
  directives: { facade: directive },
  data() {
    return {
      lastValue: this.value,
      maskedValue: null,
      unmaskedValue: null
    }
  },
  watch: {
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
      let emittedValue = this.mask && this.masked ? this.maskedValue : this.unmaskedValue

      // avoid unecessary emit when has no change
      if (this.lastValue !== emittedValue) {
        this.lastValue = emittedValue
        this.$emit('input', emittedValue)
      }
    }
  }
}
</script>
