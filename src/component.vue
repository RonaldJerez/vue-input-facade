<template>
  <input type="text" v-facade="config" :value="maskedValue" v-on="listeners" />
</template>

<script>
import directive from './directive'
import masker from './masker'

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
      lastValue: this.value
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

      if (this.mask && !this.masked) {
        const maskerConfig = {
          mask: this.mask,
          tokens: this.tokens,
          masked: false
        }
        emittedValue = masker(this.maskedValue, maskerConfig)
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
