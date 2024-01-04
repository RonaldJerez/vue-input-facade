import { type StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'
import { execSync } from 'child_process'

const STORYBOOK_VERSION_NUM = execSync('git describe --tags --abbrev=0').toString().trim()
const STORYBOOK_COMMIT_HASH = execSync('git rev-parse --short HEAD').toString().trim()

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true
  },
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  env: (config) => ({
    ...config,
    STORYBOOK_VERSION_NUM,
    STORYBOOK_COMMIT_HASH
  }),
  async viteFinal(config, { configType }) {
    // return the customized config
    return mergeConfig(config, {
      // customize the Vite config here
    })
  }
}

export default config
