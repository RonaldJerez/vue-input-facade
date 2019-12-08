<template>
  <input type="text" v-mask="config" :value="value" v-on="listeners" />
</template>

<script>
import directive from './directive'
import masker from './masker'

export default {
  name: 'TheMask',
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
  directives: { mask: directive },
  // data() {
  //   return {
  //     // avoid unecessary emit when has no change
  //     lastValue: this.value
  //   }
  // },
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

      if (!this.masked) {
        const maskerConfig = {
          mask: this.mask,
          tokens: this.tokens,
          masked: false
        }
        emittedValue = masker(emittedValue, maskerConfig)
      }

      // if (this.lastValue != emittedValue) {
      this.$emit('input', emittedValue)
      // }
    }
  }
}
</script>
