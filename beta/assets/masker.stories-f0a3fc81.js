import"./plugin-5acb77eb.js";import{_ as m,a as p}from"./Field-a175bcc1.js";import{b as r}from"./vue.esm-bundler-80178e97.js";import{m as u}from"./component-3ebcc565.js";const d={title:"Masker",tags:["hidden"]},e={render:()=>({components:{Display:m,Field:p},setup(){const o=r(18001234567),t=r("ABC1234510");return{phoneNumber:o,orderNumber:t,masker:u}},template:`
      <p>Thanks for ordering with us. Your order number is <b>{{ masker(orderNumber, 'SSS-#####-##').masked }}</b>. If you need assistance please call us at <b>{{ masker(phoneNumber, '#-###-###-####').masked }}</b></p>
    `})};var s,n,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Display,
      Field
    },
    setup() {
      const phoneNumber = ref(18001234567);
      const orderNumber = ref('ABC1234510');
      return {
        phoneNumber,
        orderNumber,
        masker
      };
    },
    template: \`
      <p>Thanks for ordering with us. Your order number is <b>{{ masker(orderNumber, 'SSS-#####-##').masked }}</b>. If you need assistance please call us at <b>{{ masker(phoneNumber, '#-###-###-####').masked }}</b></p>
    \`
  })
}`,...(a=(n=e.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const i=["MaskStaticText"],f=Object.freeze(Object.defineProperty({__proto__:null,MaskStaticText:e,__namedExportsOrder:i,default:d},Symbol.toStringTag,{value:"Module"}));export{e as M,f as m};
