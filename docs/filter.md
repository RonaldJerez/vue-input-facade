You may use the library to mask values in static text as well, taking advantage of the same mask tokens.

```js 
let phoneNumber = 18001234567
let orderNumber = 'ABC1234510'

<p>Thanks for ordering with us. Your order number is <b>{{ orderNumber | facade('SSS-#####-##') }}</b>.  If you need assitance please call us at <b>{{ phoneNumber | facade('#-###-###-####') }}</b></p>
```