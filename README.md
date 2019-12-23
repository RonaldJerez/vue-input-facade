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

```js
import InputFacade from 'vue-input-facade'
Vue.use(InputFacade)
```

### Locally

```js
import { InputFacade, facade, filter } from 'vue-input-facade'
export default {
  components: { InputFacade },
  directives: { facade },
  filters: { facade: filter }
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

## Thanks

Thanks to [Marcos Neves](https://vuejs-tips.github.io/) for the vue-the-mask component of which this vue-input-facade was originally forked from.

## Contribution

You're free to contribute to this project by submitting Issues and/or pull requests. This project is test-driven, so keep in mind that every change and new feature should be covered by tests. Your name will be added to the hall of fame ;)

## License

This project is licensed under [MIT License](http://en.wikipedia.org/wiki/MIT_License)
