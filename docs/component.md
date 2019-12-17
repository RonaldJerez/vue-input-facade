### Basic Usage

```js
let value = '7321234567'
let masked = false

<example label="US Phone Number">
  <input-facade mask="(###) ### - ####" v-model="value" :masked="masked" />
</example>

<checkbox v-model="masked" />
<display :value="value" />
```

### Dynamic Masks

Accepts an array of masking pattern and dynamically chooses the appropriate one based on the number of characters in the field.

```js
let value = ''
let masked = true

<example label="US Zip Code">
  <input-facade v-model="value" :mask="['#####', '#####-####']" :masked="masked" />
</example>

<checkbox v-model="masked" />
<display :value="value" />
```

### Custom Tokens

You can override the tokens on a per field basis. Just pass in your own token definition to the field.
This can also be used to add internatilization support.

```js
let value = ''
let masked = false

let hexTokens = {
  F: {
    pattern: /[0-9A-F]/i,
    transform: v => v.toLocaleUpperCase()
  }
}

<example label="Hex Color">
  <input-facade mask="\#FFFFFF" :tokens="hexTokens" :masked="masked" v-model="value" />
</example>

<checkbox v-model="masked" />
<display :value="value" />
```

### Pipe through another function

```js
const piper = (value, event) => {
  // do not format on deletion, this could leave the input in bad state
  // but allows user to delete the leading 0 if needed for some reason
  if (event.inputType !== 'deleteContentBackward') {
    const [ month ] = value.masked.split('/')

    if (month > 12) {
      return '0' + value.unmasked
    }
  }
}

let value = ''

<example label="Date as MM/YY">
  <input-facade v-model="value" mask="##/##" :pipe="piper" />
</example>

<display :value="value" />
```
