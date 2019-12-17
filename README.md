# Vue Input Facade

A lightweight and dependency free input facade created specific for Vue

## [Docs and Demo](https://ronaldjerez.github.io/vue-input-facade)

## Installing

```
npm i vue-input-facade
or
yarn add vue-input-facade
```

## Importing

### Globally

installs the component, directive and filter for your entire application.

```javascript
import InputFacade from 'vue-input-facade'
Vue.use(InputFacade)
```

### Locally

```javascript
import { InputFacade, facade } from 'vue-input-facade'
export default {
  components: { InputFacade },
  directives: { facade }
}
```

## Usage

### Component

```html
<label>Phone Number</label>
<input-facade mask="(###) ###-####" name="phoneNumber" type="tel" masked />
```

### Directive

```html
<label>Date</label>
<input type="text" v-facade="'##/##/##'" />
```

See [demo page](https://ronaldjerez.github.io/vue-input-facade) for more usage example

## Default Tokens

+ `S` = alpha characters
+ `#` = numerical characters
+ `X` = alpha numerical characters
+ `A` = alpha characters, forced to uppercase
+ `a` = alpha characters, forced to lowercase
+ `\` = escape any of the above characters

See the [token source file](src/tokens.js) for definition signature

## Component Properties

Inherits from [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement), plus adds these additional properties:

| Property    | Required | Type          | Default                 | Description                                |
| ----------- | -------- | ------------- | ----------------------- | ------------------------------------------ |
| mask        | false    | String, Array |                         | Mask pattern                               |
| masked      | false    | Boolean       | false                   | emit value with mask chars, default is raw |
| tokens      | false    | Object        | [tokens](src/tokens.js) | Custom tokens for mask                     |

## Migrating Existing Project

If you are migrating an existing project to vue-input-facade from another plugin and dont want to touch the whole codebase.  You may pass options during plugin installation to override the default tokens or directive name.

```javascript
import InputFacade from 'vue-input-facade'

// migrating from v-mask
// the directive will now be v-mask instead of v-facade
// and all the tokens will be replaced globally by the following
const options = {
  name: 'mask',
  tokens: {
    '#': { pattern: /\d/ },
    'A': { pattern: /[a-zA-Z]/ },
    'N': { pattern: /[0-9a-zA-Z]/ },
    'X': { pattern: /./ }
  }
}

Vue.use(InputFacade, options)
```

## Thanks

Thanks to [Marcos Neves](https://vuejs-tips.github.io/) for the vue-the-mask component of which this vue-input-facade was originally forked from.

## Contribution

You're free to contribute to this project by submitting Issues and/or pull requests. This project is test-driven, so keep in mind that every change and new feature should be covered by tests. Your name will be added to the hall of fame ;)

## License

This project is licensed under [MIT License](http://en.wikipedia.org/wiki/MIT_License)
