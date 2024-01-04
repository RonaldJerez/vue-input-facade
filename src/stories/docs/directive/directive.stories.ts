import type { Meta, StoryObj } from '@storybook/vue3'
import Display from '@/stories/components/Display.vue'
import Field from '@/stories/components/Field.vue'
import { ref } from 'vue'

const meta = {
  title: 'Directive',
  tags: ['hidden']
} satisfies Meta<typeof HTMLElement>

export default meta

type Story = StoryObj<typeof HTMLElement>

export const BasicUsage: Story = {
  render: () => ({
    components: { Display, Field },
    setup() {
      const value = ref('12A789MM')

      return { value }
    },
    template: `
      <field label="Order number">
        <input type="text" v-model="value" v-facade="'XXX-###-AA'">
      </field>
      
      <display :model-value="value" />
    `
  })
}

export const UnmaskedValue: Story = {
  render: () => ({
    components: { Display, Field },
    setup() {
      const event = ref('')

      return { event }
    },
    template: `
      <field label="Enter your phone number">
        <input type="tel" v-facade="'(###) ### - ####'" @input="event = $event">
      </field>
      
      <display :model-value="event" />
    `
  })
}

export const AttachToParentElements: Story = {
  render: () => ({
    components: { Display, Field },
    template: `
      <div v-facade="'(###) ### - ####'">
        <p>Random elements in the way.</p>
        <field label="Enter your phone number">
          <input type="tel">
        </field>
      </div>
    `
  })
}
