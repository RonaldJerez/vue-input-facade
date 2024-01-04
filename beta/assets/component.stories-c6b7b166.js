import{I as o}from"./component-3ebcc565.js";import{_ as d}from"./Checkbox-73e2a31a.js";import{_ as r,a as m}from"./Field-a175bcc1.js";import{b as n}from"./vue.esm-bundler-80178e97.js";const R={title:"Component",component:o,tags:["hidden"]},u={render:()=>({components:{Checkbox:d,Display:r,Field:m,InputFacade:o},setup(){const e=n("7321234567"),a=n(!1);return{value:e,masked:a}},template:`
      <field label="US Phone Number" :initial-value="value">
        <input-facade mask="(###) ### - ####" v-model="value" :masked="masked" />
      </field>
      <checkbox v-model="masked" />
      <display :model-value="value" />
    `})},c={render:()=>({components:{Checkbox:d,Display:r,Field:m,InputFacade:o},setup(){const e=n("192.168.10.1"),a=n(!0);return{value:e,masked:a,validateIP:t=>{const l=t.masked.split(".");return l.length<4&&l[l.length-1]>25?t.masked+".":!l.some(E=>E>255)}}},template:`
      <field label="IP address">
        <input-facade name="ip" mask="##?#?.##?#?.##?#?.##?#?" v-model="value" :masked="masked" :formatter="validateIP" />
      </field>
      
      <checkbox v-model="masked" />
      <display :model-value="value" />
    `})},i={render:()=>({components:{Checkbox:d,Display:r,Field:m,InputFacade:o},setup(){const e=n(""),a=n(!0);return{value:e,masked:a}},template:`
      <field label="One or more numbers">
        <input-facade mask="##* AA" v-model="value" :masked="masked" />
      </field>
      
      <checkbox v-model="masked" />
      <display :model-value="value" />
    `})},p={render:()=>({components:{Checkbox:d,Display:r,Field:m,InputFacade:o},setup(){const e=n(""),a=n(!0);return{value:e,masked:a}},template:`
      <field label="ID Code">
        <input-facade mask="A|B|C-####" v-model="value" :masked="masked" />
      </field>
      
      <checkbox v-model="masked" />
      <display :model-value="value" />
    `})},k={render:()=>({components:{Checkbox:d,Display:r,Field:m,InputFacade:o},setup(){const e=n(""),a=n(""),s=n(!0);return{USPostal:e,UKPostal:a,masked:s}},template:`
      <field label="US Zip Code">
        <input-facade v-model="USPostal" :mask="['#####', '#####-####']" :masked="masked" />
      </field>
      
      <field label="UK Postal Code">
        <input-facade v-model="UKPostal" :mask="['A# #AA', 'AXX #AA', 'AA#X #AA']" :masked="masked" />
      </field>
      
      <checkbox v-model="masked" />
      <display label="Zip Code" :model-value="USPostal" />
      <display label="Postal Code" :model-value="UKPostal" />
    `})},v={render:()=>({components:{Checkbox:d,Display:r,Field:m,InputFacade:o},setup(){const e=n(""),a=n(!1);return{value:e,masked:a,hexTokens:{F:{pattern:/[0-9A-F]/i,transform:t=>t.toLocaleUpperCase()}}}},template:`
      <field label="Hex Color">
        <input-facade mask="\\#FFFFFF" :tokens="hexTokens" :masked="masked" v-model="value" />
      </field>
      
      <checkbox v-model="masked" />
      <display :model-value="value" />
    `})},f={render:()=>({components:{Checkbox:d,Display:r,Field:m,InputFacade:o},setup(){const e=n("");function a(s,t){if(t.inputType!=="deleteContentBackward"){const[l]=s.masked.split("/");if(l>12)return"0"+s.unmasked}}return{value:e,date:a}},template:`
      <field label="Date as MM/YY">
        <input-facade v-model="value" mask="##/##" :formatter="date" />
      </field>
      
      <display :model-value="value" />
    `})},b={render:()=>({components:{Checkbox:d,Display:r,Field:m,InputFacade:o},setup(){const e=n("");function a(s,t){if(t.data&&t.data%2!==0)return!1;if(s.unmasked){const l=s.unmasked.match(/\d{1,3}/g).join(",");return s.masked=`$${l}`,!0}}return{value:e,evenMoney:a}},template:`
      <field label="Enter an even num">
        <input-facade v-model="value" mask="#########" :formatter="evenMoney" masked />
      </field>
      
      <display :model-value="value" />
    `})};var h,y,F;u.parameters={...u.parameters,docs:{...(h=u.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Checkbox,
      Display,
      Field,
      InputFacade
    },
    setup() {
      const value = ref('7321234567');
      const masked = ref(false);
      return {
        value,
        masked
      };
    },
    template: \`
      <field label="US Phone Number" :initial-value="value">
        <input-facade mask="(###) ### - ####" v-model="value" :masked="masked" />
      </field>
      <checkbox v-model="masked" />
      <display :model-value="value" />
    \`
  })
}`,...(F=(y=u.parameters)==null?void 0:y.docs)==null?void 0:F.source}}};var C,x,P;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Checkbox,
      Display,
      Field,
      InputFacade
    },
    setup() {
      const value = ref('192.168.10.1');
      const masked = ref(true);
      const validateIP = (value: any) => {
        const parts = value.masked.split('.');
        if (parts.length < 4 && parts[parts.length - 1] > 25) {
          return value.masked + '.';
        }
        return !parts.some((part: number) => part > 255);
      };
      return {
        value,
        masked,
        validateIP
      };
    },
    template: \`
      <field label="IP address">
        <input-facade name="ip" mask="##?#?.##?#?.##?#?.##?#?" v-model="value" :masked="masked" :formatter="validateIP" />
      </field>
      
      <checkbox v-model="masked" />
      <display :model-value="value" />
    \`
  })
}`,...(P=(x=c.parameters)==null?void 0:x.docs)==null?void 0:P.source}}};var A,g,I;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Checkbox,
      Display,
      Field,
      InputFacade
    },
    setup() {
      const value = ref('');
      const masked = ref(true);
      return {
        value,
        masked
      };
    },
    template: \`
      <field label="One or more numbers">
        <input-facade mask="##* AA" v-model="value" :masked="masked" />
      </field>
      
      <checkbox v-model="masked" />
      <display :model-value="value" />
    \`
  })
}`,...(I=(g=i.parameters)==null?void 0:g.docs)==null?void 0:I.source}}};var S,U,D;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Checkbox,
      Display,
      Field,
      InputFacade
    },
    setup() {
      const value = ref('');
      const masked = ref(true);
      return {
        value,
        masked
      };
    },
    template: \`
      <field label="ID Code">
        <input-facade mask="A|B|C-####" v-model="value" :masked="masked" />
      </field>
      
      <checkbox v-model="masked" />
      <display :model-value="value" />
    \`
  })
}`,...(D=(U=p.parameters)==null?void 0:U.docs)==null?void 0:D.source}}};var M,_,T;k.parameters={...k.parameters,docs:{...(M=k.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Checkbox,
      Display,
      Field,
      InputFacade
    },
    setup() {
      const USPostal = ref('');
      const UKPostal = ref('');
      const masked = ref(true);
      return {
        USPostal,
        UKPostal,
        masked
      };
    },
    template: \`
      <field label="US Zip Code">
        <input-facade v-model="USPostal" :mask="['#####', '#####-####']" :masked="masked" />
      </field>
      
      <field label="UK Postal Code">
        <input-facade v-model="UKPostal" :mask="['A# #AA', 'AXX #AA', 'AA#X #AA']" :masked="masked" />
      </field>
      
      <checkbox v-model="masked" />
      <display label="Zip Code" :model-value="USPostal" />
      <display label="Postal Code" :model-value="UKPostal" />
    \`
  })
}`,...(T=(_=k.parameters)==null?void 0:_.docs)==null?void 0:T.source}}};var B,K,O;v.parameters={...v.parameters,docs:{...(B=v.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Checkbox,
      Display,
      Field,
      InputFacade
    },
    setup() {
      const value = ref('');
      const masked = ref(false);
      const hexTokens = {
        F: {
          pattern: /[0-9A-F]/i,
          transform: (v: any) => v.toLocaleUpperCase()
        }
      };
      return {
        value,
        masked,
        hexTokens
      };
    },
    template: \`
      <field label="Hex Color">
        <input-facade mask="\\\\#FFFFFF" :tokens="hexTokens" :masked="masked" v-model="value" />
      </field>
      
      <checkbox v-model="masked" />
      <display :model-value="value" />
    \`
  })
}`,...(O=(K=v.parameters)==null?void 0:K.docs)==null?void 0:O.source}}};var X,$,j;f.parameters={...f.parameters,docs:{...(X=f.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Checkbox,
      Display,
      Field,
      InputFacade
    },
    setup() {
      const value = ref('');
      function date(value: any, event: any) {
        // do not format on deletion, this could leave the input in bad state
        // but allows user to delete the leading 0 if needed for some reason
        if (event.inputType !== 'deleteContentBackward') {
          const [month] = value.masked.split('/');
          if (month > 12) {
            return '0' + value.unmasked;
          }
        }
      }
      return {
        value,
        date
      };
    },
    template: \`
      <field label="Date as MM/YY">
        <input-facade v-model="value" mask="##/##" :formatter="date" />
      </field>
      
      <display :model-value="value" />
    \`
  })
}`,...(j=($=f.parameters)==null?void 0:$.docs)==null?void 0:j.source}}};var Y,Z,w;b.parameters={...b.parameters,docs:{...(Y=b.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Checkbox,
      Display,
      Field,
      InputFacade
    },
    setup() {
      const value = ref('');
      function evenMoney(value: any, event: any) {
        if (event.data && event.data % 2 !== 0) {
          // odd number, ignore it
          return false;
        } else if (value.unmasked) {
          const formatted = value.unmasked.match(/\\d{1,3}/g).join(',');
          value.masked = \`$\${formatted}\`;
          return true;
        }
      }
      return {
        value,
        evenMoney
      };
    },
    template: \`
      <field label="Enter an even num">
        <input-facade v-model="value" mask="#########" :formatter="evenMoney" masked />
      </field>
      
      <display :model-value="value" />
    \`
  })
}`,...(w=(Z=b.parameters)==null?void 0:Z.docs)==null?void 0:w.source}}};const H=["BasicUsage","OptionalCharacter","RepeatingCharacter","AlternationPipe","DynamicMasks","CustomTokens","PostMaskingInputFormatterString","PostMaskingInputFormatterBoolean"],G=Object.freeze(Object.defineProperty({__proto__:null,AlternationPipe:p,BasicUsage:u,CustomTokens:v,DynamicMasks:k,OptionalCharacter:c,PostMaskingInputFormatterBoolean:b,PostMaskingInputFormatterString:f,RepeatingCharacter:i,__namedExportsOrder:H,default:R},Symbol.toStringTag,{value:"Module"}));export{p as A,u as B,v as C,k as D,c as O,f as P,i as R,b as a,G as c};
