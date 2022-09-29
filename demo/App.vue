<!-- Demo vue3 app for testing purposes -->
<!-- Examples copied from the component markdown -->
<template>
  <div id="app">
    <div id="value-display-div">
      <checkbox v-model="masked" />
    </div>

    <h1>Basic Usage</h1>
    <p><code>lazy</code> custom v-model modifier will only emit input event on change event.</p>
    <field label="US Phone Number">
      <input-facade mask="(###) ### - ####" v-model.lazy="basicUsageValue" :masked="masked" />
    </field>
    <display :value="basicUsageValue" />

    <h1>Optional character</h1>
    <p>
      Use a question mark (?) to indicate that a character is optional. Similar to regular expression this means 0 or 1.
    </p>
    <field label="IP address">
      <input-facade
        name="ip"
        mask="##?#?.##?#?.##?#?.##?#?"
        v-model="optionalCharvalue"
        :masked="masked"
        :formatter="validateIP"
      />
    </field>
    <display :value="optionalCharvalue" />

    <h1>Repeating character</h1>
    <p>
      Use an asterisk (*) as a suffix to set a masking character as repeating, similar to regular expression. Note that
      this means that 0 or more of said character will match. If you need to match 1 or more than you must specify it.
    </p>
    <field label="One or more numbers">
      <input-facade mask="##* AA" v-model="repeatingCharValue" :masked="masked" />
    </field>
    <display :value="repeatingCharValue" />

    <h1>Alternation (Pipe)</h1>
    <p>
      Use a pipe symbol to indicate altarnative <b>static</b> values that can be used in the mask. This is case
      insensitive and can match letters irregarless of accents. For example å = A. Android webview and Opera dont fully
      support that type of matching.
      <i>
        Note that because this only works with static values there is no need to escape characters that are also used as
        tokens.
      </i>
    </p>
    <field label="ID Code">
      <input-facade mask="A|B|C-####" v-model="alternationValue" :masked="masked" />
    </field>
    <display :value="alternationValue" />

    <h1>Dynamic Masks</h1>
    <p>
      Accepts an array of masking pattern and dynamically chooses the appropriate one based on the number of characters
      in the field.
    </p>
    <field label="US Zip Code">
      <input-facade v-model="USPostal" :mask="['#####', '#####-####']" :masked="masked" />
    </field>

    <field label="UK Postal Code">
      <input-facade v-model="UKPostal" :mask="['A# #AA', 'AXX #AA', 'AA#X #AA']" :masked="masked" />
    </field>

    <display label="Zip Code" :value="USPostal" />
    <display label="Postal Code" :value="UKPostal" />

    <h1>Custom Tokens</h1>
    <p>
      You can override the tokens on a per field basis. Just pass in your own token definition to the field. This can
      also be used to add internatilization support.
    </p>
    <field label="Hex Color">
      <input-facade mask="\#FFFFFF" :tokens="hexTokens" :masked="masked" v-model="customTokenValue" />
    </field>
    <display :value="customTokenValue" />

    <h1>Post masking input formatter</h1>
    <p>
      Returning a string in the format function will re-run that value through the masker routine, Ensuring that the end
      result still confirms to the mask.
    </p>
    <field label="Date as MM/YY">
      <input-facade v-model="formatterValue" mask="##/##" :formatter="date" />
    </field>
    <display :value="formatterValue" />
    <p>
      Returning a boolean `true` will leave the masked or unmasked value as is, the value is passed by reference so if
      you modify them here, that will be their final value. However if a `false` is returned, the user's input will be
      ignored and the value will remain as it was prior.
    </p>
    <field label="Enter an even num">
      <input-facade v-model="boolFormatterValue" mask="#########" :formatter="evenMoney" masked />
    </field>
    <display :value="boolFormatterValue" />
  </div>
</template>

<script>
import InputFacade from '../src/component.vue'
import Checkbox from '../styleguide/components/Checkbox.vue'
import Display from '../styleguide/components/Display.vue'
import Field from '../styleguide/components/Field.vue'

export default {
  name: 'App',
  components: {
    Checkbox,
    Display,
    Field,
    InputFacade
  },
  data() {
    return {
      basicUsageValue: '',
      optionalCharvalue: '',
      repeatingCharValue: '',
      alternationValue: '',
      USPostal: '',
      UKPostal: '',
      customTokenValue: '',
      formatterValue: '',
      boolFormatterValue: '',
      masked: true,
      hexTokens: {
        F: {
          pattern: /[0-9A-F]/i,
          transform: (v) => v.toLocaleUpperCase()
        }
      }
    }
  },
  methods: {
    date(value, event) {
      // do not format on deletion, this could leave the input in bad state
      // but allows user to delete the leading 0 if needed for some reason
      if (event.inputType !== 'deleteContentBackward') {
        const [month] = value.masked.split('/')

        if (month > 12) {
          return '0' + value.unmasked
        }
      }
    },
    evenMoney(value, event) {
      if (event.data && event.data % 2 !== 0) {
        // odd number, ignore it
        return false
      } else if (value.unmasked) {
        const formatted = value.unmasked.match(/\d{1,3}/g).join(',')
        value.masked = `$${formatted}`
        return true
      }
    },
    validateIP(value) {
      const parts = value.masked.split('.')

      if (parts.length < 4 && parts[parts.length - 1] > 25) {
        return value.masked + '.'
      }

      return !parts.some((part) => part > 255)
    }
  }
}
</script>

<style scoped>
#value-display-div {
  position: fixed;
  background-color: white;
  border: solid 0.75px black;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  top: 15px;
  right: 15px;
}
code {
  padding: 2px;
  border-radius: 2px;
  display: inline-block;
  background-color: #eee;
}
</style>
