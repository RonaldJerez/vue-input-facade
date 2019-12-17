<template>
  <div class="inline field">
    <label>{{ label }}</label>
    <input-facade v-bind="$attrs" v-model="editableValue" v-on="$listeners" />
    <span>{{ editableValue }}</span>
  </div>
</template>

<script>
import InputFacade from '../component.vue'
export default {
  inheritAttrs: false,
  components: { InputFacade },
  props: ['value', 'label'],
  data() {
    return {
      editableValue: this.value
    }
  }
}
</script>

<style lang="css">
.ui.form .inline.field label {
  width: 90px;
}
</style>
