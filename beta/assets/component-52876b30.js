import{j as e}from"./jsx-runtime-4dd40b89.js";import{M as i,C as s}from"./index-c354d0c8.js";import{c as r,B as c,O as h,R as l,A as d,D as u,C as m,P as p,a as f}from"./component.stories-c6b7b166.js";import{u as o}from"./index-eb4a03e2.js";import"./iframe-9424fa7f.js";import"../sb-preview/runtime.js";import"./index-f4dda215.js";import"./index-11d98b33.js";import"./index-356e4a49.js";import"./component-3ebcc565.js";import"./vue.esm-bundler-80178e97.js";import"./Checkbox-73e2a31a.js";import"./Field-a175bcc1.js";function n(a){const t=Object.assign({h3:"h3",p:"p",strong:"strong",blockquote:"blockquote",em:"em",code:"code"},o(),a.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:r}),`
`,e.jsx(t.h3,{id:"basic-usage",children:"Basic usage"}),`
`,e.jsx(s,{of:c,sourceState:"shown"}),`
`,e.jsx(t.h3,{id:"optional-character",children:"Optional character"}),`
`,e.jsx(t.p,{children:"Use a question mark (?) to indicate that a character is optional. Similar to regular expression this means 0 or 1."}),`
`,e.jsx(s,{of:h,sourceState:"shown"}),`
`,e.jsx(t.h3,{id:"repeating-character",children:"Repeating character"}),`
`,e.jsx(t.p,{children:"Use an asterisk (*) as a suffix to set a masking character as repeating, similar to regular expression. Note that this means that 0 or more of said character will match. If you need to match  1 or more than you must specify it."}),`
`,e.jsx(s,{of:l,sourceState:"shown"}),`
`,e.jsx(t.h3,{id:"alternation-pipe",children:"Alternation (Pipe)"}),`
`,e.jsxs(t.p,{children:["Use a pipe symbol to indicate altarnative ",e.jsx(t.strong,{children:"static"})," values that can be used in the mask. This is case insensitive and can match letters irregarless of accents. For field å = A. Android webview and Opera dont fully support that type of matching."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:e.jsx(t.em,{children:"Note that because this only works with static values there is no need to escape characters that are also used as tokens."})}),`
`]}),`
`,e.jsx(s,{of:d,sourceState:"shown"}),`
`,e.jsx(t.h3,{id:"dynamic-masks",children:"Dynamic Masks"}),`
`,e.jsx(t.p,{children:"Accepts an array of masking pattern and dynamically chooses the appropriate one based on the number of characters in the field."}),`
`,e.jsx(s,{of:u,sourceState:"shown"}),`
`,e.jsx(t.h3,{id:"custom-tokens",children:"Custom Tokens"}),`
`,e.jsx(t.p,{children:`You can override the tokens on a per field basis. Just pass in your own token definition to the field.
This can also be used to add internatilization support.`}),`
`,e.jsx(s,{of:m,sourceState:"shown"}),`
`,e.jsx(t.h3,{id:"post-masking-input-formatter",children:"Post masking input formatter"}),`
`,e.jsx(t.p,{children:"Returning a string in the format function will re-run that value through the masker routine, Ensuring that the end result still confirms to the mask."}),`
`,e.jsx(s,{of:p,sourceState:"shown"}),`
`,e.jsxs(t.p,{children:["Returning a boolean ",e.jsx(t.code,{children:"true"})," will leave the masked or unmasked value as is, the value is passed by reference so if you modify them here, that will be their final value. However if a ",e.jsx(t.code,{children:"false"})," is returned, the user's input will be ignored and the value will remain as it was prior."]}),`
`,e.jsx(s,{of:f,sourceState:"shown"})]})}function D(a={}){const{wrapper:t}=Object.assign({},o(),a.components);return t?e.jsx(t,Object.assign({},a,{children:e.jsx(n,a)})):n(a)}export{D as default};
