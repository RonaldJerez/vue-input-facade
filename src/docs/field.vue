<template>
  <div class="inline field">
    <label>{{ label }}</label>
    <input-facade
      :mask="mask"
      :tokens="tokens"
      v-model="editableValue"
      :placeholder="placeholder"
      :masked="masked"
      :type="type || 'tel'"
    ></input-facade>
    <span>{{ editableValue }}</span>
  </div>
</template>

<script>
import InputFacade from '../component.vue'
export default {
  components: { InputFacade },
  props: ['label', 'mask', 'placeholder', 'masked', 'type', 'tokens', 'value'],
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
