import type { Meta, StoryObj } from '@storybook/vue3'
import { masker } from '@/plugin'
import Display from '@/stories/components/Display.vue'
import Field from '@/stories/components/Field.vue'
import { ref } from 'vue'

const meta = {
  title: 'Masker',
  tags: ['hidden']
} satisfies Meta<typeof HTMLElement>

export default meta

type Story = StoryObj<typeof HTMLElement>

export const MaskStaticText: Story = {
  render: () => ({
    components: { Display, Field },
    setup() {
      const phoneNumber = ref(18001234567)
      const orderNumber = ref('ABC1234510')

      return { phoneNumber, orderNumber, masker }
    },
    template: `
      <p>Thanks for ordering with us. Your order number is <b>{{ masker(orderNumber, 'SSS-#####-##').masked }}</b>. If you need assistance please call us at <b>{{ masker(phoneNumber, '#-###-###-####').masked }}</b></p>
    `
  })
}
