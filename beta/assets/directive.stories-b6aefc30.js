import{_ as a,a as r}from"./Field-a175bcc1.js";import{b as v}from"./vue.esm-bundler-80178e97.js";const y={title:"Directive",tags:["hidden"]},e={render:()=>({components:{Display:a,Field:r},setup(){return{value:v("12A789MM")}},template:`
      <field label="Order number">
        <input type="text" v-model="value" v-facade="'XXX-###-AA'">
      </field>
      
      <display :model-value="value" />
    `})},n={render:()=>({components:{Display:a,Field:r},setup(){return{event:v("")}},template:`
      <field label="Enter your phone number">
        <input type="tel" v-facade="'(###) ### - ####'" @input="event = $event">
      </field>
      
      <display :model-value="event" />
    `})},t={render:()=>({components:{Display:a,Field:r},template:`
      <div v-facade="'(###) ### - ####'">
        <p>Random elements in the way.</p>
        <field label="Enter your phone number">
          <input type="tel">
        </field>
      </div>
    `})};var l,s,o;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Display,
      Field
    },
    setup() {
      const value = ref('12A789MM');
      return {
        value
      };
    },
    template: \`
      <field label="Order number">
        <input type="text" v-model="value" v-facade="'XXX-###-AA'">
      </field>
      
      <display :model-value="value" />
    \`
  })
}`,...(o=(s=e.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var d,p,i;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Display,
      Field
    },
    setup() {
      const event = ref('');
      return {
        event
      };
    },
    template: \`
      <field label="Enter your phone number">
        <input type="tel" v-facade="'(###) ### - ####'" @input="event = $event">
      </field>
      
      <display :model-value="event" />
    \`
  })
}`,...(i=(p=n.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};var m,u,c;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Display,
      Field
    },
    template: \`
      <div v-facade="'(###) ### - ####'">
        <p>Random elements in the way.</p>
        <field label="Enter your phone number">
          <input type="tel">
        </field>
      </div>
    \`
  })
}`,...(c=(u=t.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};const b=["BasicUsage","UnmaskedValue","AttachToParentElements"],A=Object.freeze(Object.defineProperty({__proto__:null,AttachToParentElements:t,BasicUsage:e,UnmaskedValue:n,__namedExportsOrder:b,default:y},Symbol.toStringTag,{value:"Module"}));export{t as A,e as B,n as U,A as d};
