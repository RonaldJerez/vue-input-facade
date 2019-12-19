<template>
  <input type="text" v-facade="config" :value="maskedValue" v-on="listeners" />
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
      maskedValue: this.value,
      lastValue: this.value,
      unmaskedValue: ''
    }
  },
  watch: {
    value(newValue) {
      if (newValue !== this.lastValue) {
        this.maskedValue = newValue
      }
    },
    masked() {
      this.refresh()
    }
  },
  computed: {
    config() {
      const config = !!this.mask && {
        mask: this.mask,
        tokens: this.tokens
      }
      return config
    },
    listeners() {
      const vm = this
      return Object.assign({}, this.$listeners, {
        input: vm.refresh
      })
    }
  },
  methods: {
    refresh(event) {
      this.maskedValue = event ? event.target.value : this.maskedValue
      let emittedValue = this.maskedValue
      this.unmaskedValue = event ? event.target.unmaskedValue : this.unmaskedValue || emittedValue

      if (this.mask && !this.masked) {
        emittedValue = this.unmaskedValue
      }

      // avoid unecessary emit when has no change
      if (this.lastValue !== emittedValue) {
        this.lastValue = emittedValue
        this.$emit('input', emittedValue)
      }
    }
  }
}
</script>
