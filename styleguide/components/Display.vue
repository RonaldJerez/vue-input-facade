<template>
  <pre v-if="display" class="display">
    <div class="display__value">{{ display }}</div>
  </pre>
</template>

<script>
export default {
  name: 'Display',
  props: ['value'],
  computed: {
    display() {
      let output = ''

      if (this.value instanceof Event && this.value.target) {
        const masked = this.value.target.value
        const unmasked = this.value.target.unmaskedValue

        output = `event.target: {
  value: '${masked}',
  unmaskedValue: '${unmasked}'
}`
      } else if (typeof this.value === 'string') {
        output = `value: '${this.value}'`
      }

      return output
    }
  }
}
</script>

<style scoped>
.display {
  margin: 0;
  margin-left: -16px;
}

.display__value {
  padding: 12px;
  border-radius: 10px;
  display: inline-block;
  background-color: #eee;
}
</style>
