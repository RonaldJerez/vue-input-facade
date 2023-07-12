const path = require('path')
const pkg = require('../package.json')
const { execSync } = require('child_process')

const root = path.resolve(__dirname, '../')

// get the version from the last tag
const version = execSync('git describe --tags --abbrev=0').toString()

module.exports = {
  title: 'Vue Input Facade',
  version: version,
  require: [`${root}/styleguide/imports.js`, `${root}/styleguide/style.css`],
  previewDelay: 2000,
  styleguideDir: 'build',
  usageMode: 'expand',
  exampleMode: 'expand',
  getComponentPathLine: () => '',
  progressBar: process.env.NODE_ENV === 'development',
  ribbon: {
    url: pkg.repository.url,
    text: 'View on GitHub'
  },
  sections: [
    {
      name: 'Introduction',
      content: `${root}/README.md`
    },
    {
      name: 'Component',
      components: [`${root}/src/component.vue`]
    },
    {
      name: 'Directive',
      content: `${root}/docs/directive.md`
    },
    {
      name: 'Masker',
      content: `${root}/docs/masker.md`
    },
    {
      name: 'Advanced',
      content: `${root}/docs/advanced.md`
    }
  ]
}
