import{j as e}from"./jsx-runtime-4dd40b89.js";import{M as i,C as s}from"./index-c354d0c8.js";import{d as c,B as r,U as h,A as d}from"./directive.stories-b6aefc30.js";import{u as o}from"./index-eb4a03e2.js";import"./iframe-9424fa7f.js";import"../sb-preview/runtime.js";import"./index-f4dda215.js";import"./index-11d98b33.js";import"./index-356e4a49.js";import"./Field-a175bcc1.js";import"./vue.esm-bundler-80178e97.js";function a(n){const t=Object.assign({p:"p",code:"code",h3:"h3",blockquote:"blockquote"},o(),n.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:c}),`
`,e.jsxs(t.p,{children:["For times when you cannot use the component, you may use the directive instead. The directive has all the same features as the component, however the interface may not be as straight forward as using a component. The ",e.jsx(t.code,{children:"prefill"})," and ",e.jsx(t.code,{children:"short"})," features may passed in to the directive as modifiers."]}),`
`,e.jsx(t.h3,{id:"basic-usage",children:"Basic usage"}),`
`,e.jsx(s,{of:r,sourceState:"shown"}),`
`,e.jsx(t.h3,{id:"accessing-the-unmasked-value",children:"Accessing the unmasked value"}),`
`,e.jsxs(t.p,{children:["You have access to the unmasked value via the input event. The ",e.jsx(t.code,{children:"unmaskedValue"})," property can be found as part of the ",e.jsx(t.code,{children:"target"})," property of the input event."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:["Note: Some 3rd party components may not pass the ",e.jsx(t.code,{children:"event"})," parameter when emitting input, such is the case with vuetify's v-text-input. In this case you can listen to the native event so you can still access the unmasked value. ex: ",e.jsx(t.code,{children:'@input.native="handler"'}),"."]}),`
`]}),`
`,e.jsx(s,{of:h,sourceState:"shown"}),`
`,e.jsx(t.h3,{id:"attaching-to-parent-elements",children:"Attaching to parent elements"}),`
`,e.jsx(t.p,{children:"When the the v-facade directive is attached to a non input element, it will attempt to find an input element within the children and attach it self to the first one it finds. This allows you add the directive on other 3rd party components that house an input element."}),`
`,e.jsx(s,{of:d,sourceState:"shown"})]})}function b(n={}){const{wrapper:t}=Object.assign({},o(),n.components);return t?e.jsx(t,Object.assign({},n,{children:e.jsx(a,n)})):a(n)}export{b as default};
