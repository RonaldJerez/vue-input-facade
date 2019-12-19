<template>
  <input type="text" v-facade="config" :value="display" v-on="listeners" />
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
      display: this.value,
      lastValue: this.value,
      maskedValue: null,
      unmaskedValue: null
    }
  },
  watch: {
    value(newValue) {
      if (newValue !== this.display) {
        this.display = newValue
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
      this.unmaskedValue = event ? event.target.unmaskedValue : this.unmaskedValue
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
