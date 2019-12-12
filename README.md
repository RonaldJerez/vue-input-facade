# Vue Input Facade

A lightweight and dependency free input facade created specific for Vue

## [Docs and Demo](https://ronaldjerez.github.io/vue-input-facade)

## Install

```
yarn add vue-input-facade
or
npm i vue-input-facade
```

## Usage (two flavors)

### Global

```javascript
import InputFacade from 'vue-input-facade'
Vue.use(InputFacade)
```

### Local (inside the component)

```javascript
import { InputFacade } from 'vue-input-facade'
export default {
  components: { InputFacade }
}
```

### Local (as directive)

```javascript
import { facade } from 'vue-input-facade'
export default {
  directives: { facade }
}
```

### Local (as filter)

```javascript
import { masker } from 'vue-input-facade'
export default {
  filters: { facade: masker }
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
| mask        | false    | String, Array |                   | Mask pattern                               |
| masked      | false    | Boolean       | false             | emit value with mask chars, default is raw |
| tokens      | false    | Object        | [tokens](#tokens) | Custom tokens for mask                     |

## Thanks

Thanks to [Marcos Neves](https://vuejs-tips.github.io/) for the vue-the-mask component of which this vue-input-facade was originally forked from.

## Contribution

You're free to contribute to this project by submitting Issues and/or pull requests. This project is test-driven, so keep in mind that every change and new feature should be covered by tests. Your name will be added to the hall of fame ;)

## License

This project is licensed under [MIT License](http://en.wikipedia.org/wiki/MIT_License)
