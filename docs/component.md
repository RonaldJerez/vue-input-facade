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

```js
let franceIBAN = 'FR7630006000011234567890189'
let masked = true

<example label="France IBAN">
  <input-facade mask="FR## #### #### #### #### #### ###" v-model="franceIBAN" :masked="masked" />
</example>

<checkbox v-model="masked" />
<display :value="franceIBAN" />
```

### Optional next mask

```js
let value = '192.168.10.1'
let masked = false

<example label="IP address">
  <input-facade mask="##?#?.##?#?.##?#?.##?#?" v-model="value" :masked="masked" />
</example>

<checkbox v-model="masked" />
<display :value="value" />
```

### Dynamic Masks

Accepts an array of masking pattern and dynamically chooses the appropriate one based on the number of characters in the field.

```js
let USPostal = ''
let UKPostal = ''

let masked = true
<example label="US Zip Code">
  <input-facade v-model="USPostal" :mask="['#####', '#####-####']" :masked="masked" />
</example>

<example label="UK Postal Code">
  <input-facade v-model="UKPostal" :mask="['A# #AA', 'AXX #AA', 'AA#X #AA']" :masked="masked" />
</example>

<checkbox v-model="masked" />
<display label="Zip Code" :value="USPostal" />
<display label="Postal Code" :value="UKPostal" />
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

### Post masking input formatter

Returning a string in the format function will re-run that value through the masker routine, Ensuring that the end result still confirms to the mask.

```js
const date = (value, event) => {
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
  <input-facade v-model="value" mask="##/##" :formatter="date" />
</example>

<display :value="value" />
```

Returning a boolean `true` will leave the masked or unmasked value as is, the value is passed by reference so if you modify them here, that will be their final value.  However if a `false` is returned, the user's input will be ignored and the value will remain as it was prior.

```js
const evenMoney = (value, event) => {
  if (event.data && event.data % 2 !== 0) {
    // odd number, ignore it
    return false
  } else if (value.unmasked) {
    const formatted = value.unmasked.match(/\d{1,3}/g).join(',')
    value.masked = `\$${formatted}`
    return true
  }
}

let value = ''

<example label="Enter an even num">
  <input-facade v-model="value" mask="#########" :formatter="evenMoney" masked />
</example>

<display :value="value" />
```
