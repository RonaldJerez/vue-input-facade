const path = require('path')
const { execSync } = require('child_process');

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
  sections: [
    {
      name: 'Installing',
      content: `${root}/docs/installing.md`
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
      name: 'Filter',
      content: `${root}/docs/filter.md`
    },
    {
      name: 'Advanced',
      content: `${root}/docs/advanced.md`
    }
  ]
}
