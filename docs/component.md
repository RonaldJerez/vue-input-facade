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

### Optional character

Use a question mark (?) to indicate that a character is optional. Similar to regular expression this means 0 or 1.

```js
let value = '192.168.10.1'
let masked = true

const validateIP = (value, event) => {
  const parts = value.masked.split('.')

  if (parts.length < 4 && parts[parts.length - 1] > 25) {
    return value.masked + '.'
  }

  return !parts.some(part => part > 255)
}

<example label="IP address">
  <input-facade name="ip" mask="##?#?.##?#?.##?#?.##?#?" v-model="value" :masked="masked" :formatter="validateIP" />
</example>

<checkbox v-model="masked" />
<display :value="value" />
```

### Repeating character

Use an asterisk (*) as a suffix to set a masking character as repeating, similar to regular expression. Note that this means that 0 or more of said character will match.  If you need to match  1 or more than you must specify it.

```js
let value = ''
let masked = true

<example label="One or more numbers">
  <input-facade mask="##* AA" v-model="value" :masked="masked" />
</example>

<checkbox v-model="masked" />
<display :value="value" />
```

### Alternation (Pipe)

Use a pipe symbol to indicate altarnative **static** values that can be used in the mask. This is case insensitive and can match letters irregarless of accents. For example å = A. Android webview and Opera dont fully support that type of matching.
> *Note that because this only works with static values there is no need to escape characters that are also used as tokens.*

```js
let value = ''
let masked = true

<example label="ID Code">
  <input-facade mask="A|B|C-####" v-model="value" :masked="masked" />
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
