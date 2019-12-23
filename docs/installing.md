Installing with NPM

```bash
npm i vue-input-facade
```

Installing with Yarn

```bash
yarn add vue-input-facade
```
### Importing globally

installs the component, directive and filter for your entire application.

```javascript
import InputFacade from 'vue-input-facade'
Vue.use(InputFacade)
```

### Importing locally

```javascript
import { InputFacade, facade, filter } from 'vue-input-facade'

export default {
  components: { InputFacade },
  directives: { facade },
  filters: { facade: filter }
  // ... rest component config
}
```

### Default Mask Tokens

+ `S` = alpha characters
+ `#` = numerical characters
+ `X` = alpha numerical characters
+ `A` = alpha characters, transformed to uppercase
+ `a` = alpha characters, transformed to lowercase
+ `\` = escape any of the above characters

See the [token source file](https://github.com/RonaldJerez/vue-input-facade/blob/master/src/tokens.js) for definition signature