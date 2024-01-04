import { addons } from '@storybook/manager-api'

addons.setConfig({
  sidebar: {
    filters: {
      patterns: (item: any) => {
        return !item.tags.includes('hidden')
      }
    }
  }
})
