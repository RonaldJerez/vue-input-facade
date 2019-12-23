### Migrating existing projects

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
    'A': { pattern: /[a-z]/i },
    'N': { pattern: /[0-9a-z]/i },
    'X': { pattern: /./ }
  }
}

Vue.use(InputFacade, options)
```
