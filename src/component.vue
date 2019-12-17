<template>
  <input type="text" v-facade="config" :value="value" v-on="listeners" />
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
      lastValue: this.value
    }
  },
  watch: {
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
      let emittedValue = event ? event.target.value : this.value

      if (this.mask && !this.masked) {
        const maskerConfig = {
          mask: this.mask,
          tokens: this.tokens,
          masked: false
        }
        emittedValue = masker(emittedValue, maskerConfig)
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
