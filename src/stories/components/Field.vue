<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  initialValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
})

const inputValue = ref(null)

onMounted(() => {
  inputValue.value = props.initialValue
})

function input(event) {
  inputValue.value = event.target.value
}
</script>

<template>
  <div class="field-wrapper" :class="{ hasValue: inputValue }" @input="input">
    <slot />
    <label>{{ label }}</label>
  </div>
</template>

<style>
.field-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 15px;
}

.field-wrapper input {
  border: 1px solid #80868b;
  padding: 15px;
  border-radius: 4px;
  min-width: 250px;
  margin: 1px;
  font-size: 16px;
}

.field-wrapper input:focus {
  border: 2px solid #1a73e8;
  outline: none;
  margin: 0px;
}

.field-wrapper label {
  pointer-events: none;
  position: absolute;
  background: #fff;
  bottom: 17px;
  box-sizing: border-box;
  color: #80868b;
  left: 8px;
  padding: 0 8px;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left top;
  z-index: 1;
}

.field-wrapper input:focus ~ label {
  color: #1a73e8;
}

.field-wrapper input:focus ~ label,
.field-wrapper.hasValue input ~ label {
  transform: scale(0.75) translateX(8px) translateY(-30px);
}
</style>
