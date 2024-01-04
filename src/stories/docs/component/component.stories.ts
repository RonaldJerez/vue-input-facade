import type { Meta, StoryObj } from '@storybook/vue3'
import InputFacade from '@/component.vue'
import Checkbox from '@/stories/components/Checkbox.vue'
import Display from '@/stories/components/Display.vue'
import Field from '@/stories/components/Field.vue'
import { ref } from 'vue'

const meta = {
  title: 'Component',
  component: InputFacade,
  tags: ['hidden']
} satisfies Meta<typeof InputFacade>

export default meta

type Story = StoryObj<typeof InputFacade>

export const BasicUsage: Story = {
  render: () => ({
    components: { Checkbox, Display, Field, InputFacade },
    setup() {
      const value = ref('7321234567')
      const masked = ref(false)

      return { value, masked }
    },
    template: `
      <field label="US Phone Number" :initial-value="value">
        <input-facade mask="(###) ### - ####" v-model="value" :masked="masked" />
      </field>
      <checkbox v-model="masked" />
      <display :model-value="value" />
    `
  })
}

export const OptionalCharacter: Story = {
  render: () => ({
    components: { Checkbox, Display, Field, InputFacade },
    setup() {
      const value = ref('192.168.10.1')
      const masked = ref(true)

      const validateIP = (value: any) => {
        const parts = value.masked.split('.')

        if (parts.length < 4 && parts[parts.length - 1] > 25) {
          return value.masked + '.'
        }

        return !parts.some((part: number) => part > 255)
      }

      return { value, masked, validateIP }
    },
    template: `
      <field label="IP address">
        <input-facade name="ip" mask="##?#?.##?#?.##?#?.##?#?" v-model="value" :masked="masked" :formatter="validateIP" />
      </field>
      
      <checkbox v-model="masked" />
      <display :model-value="value" />
    `
  })
}

export const RepeatingCharacter: Story = {
  render: () => ({
    components: { Checkbox, Display, Field, InputFacade },
    setup() {
      const value = ref('')
      const masked = ref(true)

      return { value, masked }
    },
    template: `
      <field label="One or more numbers">
        <input-facade mask="##* AA" v-model="value" :masked="masked" />
      </field>
      
      <checkbox v-model="masked" />
      <display :model-value="value" />
    `
  })
}

export const AlternationPipe: Story = {
  render: () => ({
    components: { Checkbox, Display, Field, InputFacade },
    setup() {
      const value = ref('')
      const masked = ref(true)

      return { value, masked }
    },
    template: `
      <field label="ID Code">
        <input-facade mask="A|B|C-####" v-model="value" :masked="masked" />
      </field>
      
      <checkbox v-model="masked" />
      <display :model-value="value" />
    `
  })
}

export const DynamicMasks: Story = {
  render: () => ({
    components: { Checkbox, Display, Field, InputFacade },
    setup() {
      const USPostal = ref('')
      const UKPostal = ref('')
      const masked = ref(true)

      return { USPostal, UKPostal, masked }
    },
    template: `
      <field label="US Zip Code">
        <input-facade v-model="USPostal" :mask="['#####', '#####-####']" :masked="masked" />
      </field>
      
      <field label="UK Postal Code">
        <input-facade v-model="UKPostal" :mask="['A# #AA', 'AXX #AA', 'AA#X #AA']" :masked="masked" />
      </field>
      
      <checkbox v-model="masked" />
      <display label="Zip Code" :model-value="USPostal" />
      <display label="Postal Code" :model-value="UKPostal" />
    `
  })
}

export const CustomTokens: Story = {
  render: () => ({
    components: { Checkbox, Display, Field, InputFacade },
    setup() {
      const value = ref('')
      const masked = ref(false)
      const hexTokens = {
        F: {
          pattern: /[0-9A-F]/i,
          transform: (v: any) => v.toLocaleUpperCase()
        }
      }

      return { value, masked, hexTokens }
    },
    template: `
      <field label="Hex Color">
        <input-facade mask="\\#FFFFFF" :tokens="hexTokens" :masked="masked" v-model="value" />
      </field>
      
      <checkbox v-model="masked" />
      <display :model-value="value" />
    `
  })
}

export const PostMaskingInputFormatterString: Story = {
  render: () => ({
    components: { Checkbox, Display, Field, InputFacade },
    setup() {
      const value = ref('')

      function date(value: any, event: any) {
        // do not format on deletion, this could leave the input in bad state
        // but allows user to delete the leading 0 if needed for some reason
        if (event.inputType !== 'deleteContentBackward') {
          const [month] = value.masked.split('/')

          if (month > 12) {
            return '0' + value.unmasked
          }
        }
      }

      return { value, date }
    },
    template: `
      <field label="Date as MM/YY">
        <input-facade v-model="value" mask="##/##" :formatter="date" />
      </field>
      
      <display :model-value="value" />
    `
  })
}

export const PostMaskingInputFormatterBoolean: Story = {
  render: () => ({
    components: { Checkbox, Display, Field, InputFacade },
    setup() {
      const value = ref('')

      function evenMoney(value: any, event: any) {
        if (event.data && event.data % 2 !== 0) {
          // odd number, ignore it
          return false
        } else if (value.unmasked) {
          const formatted = value.unmasked.match(/\d{1,3}/g).join(',')
          value.masked = `$${formatted}`
          return true
        }
      }

      return { value, evenMoney }
    },
    template: `
      <field label="Enter an even num">
        <input-facade v-model="value" mask="#########" :formatter="evenMoney" masked />
      </field>
      
      <display :model-value="value" />
    `
  })
}
