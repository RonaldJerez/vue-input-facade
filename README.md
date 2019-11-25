# The Mask

> The original seems to be abandoned, I am trying to fix a few outstanding issues and update this repo a bit. WORK IN PROGRESS.

A lightweight and dependency free mask input created specific for Vue.js

## [Docs and Demo](https://ronaldjerez.github.io/vue-the-mask)

## Install

```
yarn add @rj-pkgs/vue-the-mask
or
npm i @rj-pkgs/vue-the-mask
```

## Usage (two flavors)

### Global

```javascript
import VueTheMask from '@rj-pkgs/vue-the-mask'
Vue.use(VueTheMask)
```

### Local (inside the component)

```javascript
import { TheMask } from '@rj-pkgs/vue-the-mask'
export default {
  components: { TheMask }
}
```

### Local (as directive)

```javascript
import { mask } from '@rj-pkgs/vue-the-mask'
export default {
  directives: { mask }
}
```

## Tokens

```javascript
'#': {pattern: /\d/},
'X': {pattern: /[0-9a-zA-Z]/},
'S': {pattern: /[a-zA-Z]/},
'A': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase()},
'a': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase()},
'!': {escape: true}
```

## Properties

| Property    | Required | Type          | Default           | Description                                |
| ----------- | -------- | ------------- | ----------------- | ------------------------------------------ |
| value       | false    | String        |                   | Input value or v-model                     |
| mask        | **true** | String, Array |                   | Mask pattern                               |
| masked      | false    | Boolean       | false             | emit value with mask chars, default is raw |
| placeholder | false    | String        |                   | Same as html input                         |
| type        | false    | String        | 'text'            | Input type (email, tel, number, ...)       |
| tokens      | false    | Object        | [tokens](#tokens) | Custom tokens for mask                     |

## Contribution

You're free to contribute to this project by submitting Issues and/or pull requests. This project is test-driven, so keep in mind that every change and new feature should be covered by tests. Your name will be added to the hall of fame ;)

## License

This project is licensed under [MIT License](http://en.wikipedia.org/wiki/MIT_License)
