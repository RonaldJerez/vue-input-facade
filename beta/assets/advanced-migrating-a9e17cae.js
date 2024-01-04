import{j as n}from"./jsx-runtime-4dd40b89.js";import{M as a}from"./index-c354d0c8.js";import{u as i}from"./index-eb4a03e2.js";import"./iframe-9424fa7f.js";import"../sb-preview/runtime.js";import"./index-f4dda215.js";import"./index-11d98b33.js";import"./index-356e4a49.js";function o(e){const t=Object.assign({h3:"h3",p:"p",pre:"pre",code:"code"},i(),e.components);return n.jsxs(n.Fragment,{children:[n.jsx(a,{title:"Advanced/Migrating existing projects"}),`
`,n.jsx(t.h3,{id:"migrating-existing-projects",children:"Migrating existing projects"}),`
`,n.jsx(t.p,{children:"If you are migrating an existing project to vue-input-facade from another plugin and dont want to touch the whole codebase. You may pass options during plugin installation to override the default tokens or directive name."}),`
`,n.jsx(t.pre,{children:n.jsx(t.code,{className:"language-js",children:`import InputFacade from 'vue-input-facade'

// migrating from v-mask
const options = {
  // rename the directive from: v-facade to: v-mask
  name: 'mask',

  // use these tokens instead of the default
  tokens: {
    '#': { pattern: /\\d/ },
    'A': { pattern: /[a-z]/i },
    'N': { pattern: /[0-9a-z]/i },
    'X': { pattern: /./ }
  }
}

Vue.use(InputFacade, options)
`})})]})}function j(e={}){const{wrapper:t}=Object.assign({},i(),e.components);return t?n.jsx(t,Object.assign({},e,{children:n.jsx(o,e)})):o(e)}export{j as default};
