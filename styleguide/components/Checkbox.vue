<template>
  <div class="checkbox">
    <input
      ref="checkbox"
      :id="name"
      :name="name"
      :checked="value"
      class="checkbox__input"
      type="checkbox"
      @change="input"
    />
    <label :for="name" class="checkbox__label" tabindex="0" @keyup.enter="input">
      Get masked data
    </label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    value: Boolean
  },
  data() {
    return {
      name: ''
    }
  },
  mounted() {
    this.name = 'checkbox' + Math.floor(Math.random() * 500).toString(16)
  },
  methods: {
    input() {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style>
.checkbox {
  display: flex;
  margin-left: -8px;
  margin-bottom: 16px;
}

.checkbox__input {
  visibility: hidden;
  width: 0;
}

.checkbox__label {
  display: flex;
  cursor: pointer;
  font-size: 1rem;
  outline: none;
  padding: 5px;
}

.checkbox__label:focus {
  outline: 1px dotted #1a73e8;
}

.checkbox__label::before {
  display: inline-block;
  content: '\2713';
  min-width: 18px;
  width: 18px;
  height: 18px;
  color: transparent;
  background: transparent;
  border: 1px solid #80868b;
  border-radius: 10px;
  text-align: center;
  margin-right: 8px;
}

.checkbox__input:checked + .checkbox__label::before {
  color: #1a73e8;
  border: 1px solid #1a73e8;
}
</style>
