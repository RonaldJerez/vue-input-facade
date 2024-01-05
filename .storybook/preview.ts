import { type Preview, setup } from '@storybook/vue3'
import { type App } from 'vue'
import { plugin as InputFacade } from '@/plugin.js'
import Checkbox from '@/stories/components/Checkbox.vue'
import Display from '@/stories/components/Display.vue'
import Field from '@/stories/components/Field.vue'

import './styles.scss'

const versionNum = import.meta.env.STORYBOOK_VERSION_NUM
const commitHash = import.meta.env.STORYBOOK_COMMIT_HASH

setup((app: App) => {
  app.use(InputFacade)
  app.component('Checkbox', Checkbox)
  app.component('Display', Display)
  app.component('Field', Field)
})

const preview: Preview = {
  globalTypes: {
    version: {
      name: 'Version',
      description: 'Vue Input Facade version',
      defaultValue: versionNum,
      toolbar: {
        icon: 'info',
        items: [
          {
            value: versionNum,
            title: `${versionNum}`
          },
          {
            value: commitHash,
            title: `Commit Hash: ${commitHash}`
          }
        ],
        title: versionNum
      }
    }
  }
}

export default preview
