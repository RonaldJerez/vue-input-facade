<div align="center" markdown="1" style="text-align:center">

# Vue Input Facade

A lightweight and dependency free input masking library created specific for Vue

[![Build Status](https://travis-ci.org/RonaldJerez/vue-input-facade.svg?branch=master)](https://travis-ci.org/RonaldJerez/vue-input-facade)
[![Coverage Status](https://coveralls.io/repos/github/RonaldJerez/vue-input-facade/badge.svg?branch=master&service=github)](https://coveralls.io/github/RonaldJerez/vue-input-facade?branch=master&service=github)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

<div class="hide" markdown="1">

### [Docs and Demo](https://ronaldjerez.github.io/vue-input-facade)

</div>

---

</div>

## Installing

```bash
npm i vue-input-facade
```

```bash
yarn add vue-input-facade
```

## Importing

### Globally

Installs the component, directive and filter for your entire application.

```javascript
import InputFacade from 'vue-input-facade'
Vue.use(InputFacade)
```

### Locally

Install per component as needed

```javascript
import { InputFacade, facade, filter } from 'vue-input-facade'

export default {
  components: { InputFacade },
  directives: { facade },
  filters: { facade: filter },
  // ... rest of component config
}
```

### Default Mask Tokens

+ `S` = alpha characters
+ `#` = numerical characters
+ `X` = alpha numerical characters
+ `A` = alpha characters, transformed to uppercase
+ `a` = alpha characters, transformed to lowercase
+ `\` = escape any of the above characters
+ `?` = mark the preceding character as optional

See the [token source file](https://github.com/RonaldJerez/vue-input-facade/blob/master/src/tokens.js) for definition signature

<div class="hide" markdown="1">

## Usage

### As Component

```html
<label>Phone Number</label>
<input-facade mask="(###) ###-####" name="phoneNumber" type="tel" />
```

### As Directive

```html
<label>Date</label>
<input type="text" v-facade="'##/##/##'" />
```

### Migrating existing projects

If you are migrating an existing project to vue-input-facade from another plugin and dont want to touch the whole codebase.  You may pass options during plugin installation to override the default tokens or directive name.

```javascript
import InputFacade from 'vue-input-facade'

// migrating from v-mask
const options = {
  // rename the directive from: v-facade to: v-mask
  name: 'mask',

  // use these tokens instead of the default
  tokens: {
    '#': { pattern: /\d/ },
    'A': { pattern: /[a-z]/i },
    'N': { pattern: /[0-9a-z]/i },
    'X': { pattern: /./ }
  }
}

Vue.use(InputFacade, options)
```

See [demo page](https://ronaldjerez.github.io/vue-input-facade) for more usage examples

## Contribution

You're free to contribute to this project by submitting issues and/or pull requests. This project is test-driven, so keep in mind that every change and new feature should be covered by tests.  The project uses [semantic-release](https://github.com/semantic-release/semantic-release) to release new versions, therefore all commit messages should follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary), we are using [commitizen](https://github.com/commitizen/cz-cli) to facilitate writting the commit messages.

## License

This project is licensed under [MIT License](http://en.wikipedia.org/wiki/MIT_License)

</div>
