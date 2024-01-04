<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Event],
    required: true
  },
  label: {
    type: String,
    default: ''
  }
})

const display = computed(() => {
  let output = ''

  if (props.modelValue instanceof Event && props.modelValue.target) {
    const masked = props.modelValue.target.value
    const unmasked = props.modelValue.target.unmaskedValue

    output = `event.target: {
  value: '${masked}',
  unmaskedValue: '${unmasked}'
}`
  } else if (typeof props.modelValue === 'string') {
    output = `${props.label || 'value'}: '${props.modelValue}'`
  }

  return output
})
</script>

<template>
  <pre v-if="display" class="display">
    <div class="display__value">{{ display }}</div>
  </pre>
</template>

<style>
.display {
  margin: 0;
  margin-bottom: 4px;
  margin-left: -38px;
}

.display:last-child {
  margin-bottom: 0;
}

.display__value {
  padding: 12px;
  border-radius: 10px;
  display: inline-block;
  background-color: #eee;
}
</style>
