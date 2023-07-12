You may use the library to mask values in static text as well, taking advantage of the same mask tokens.

```js 
let phoneNumber = 18001234567
let orderNumber = 'ABC1234510'

<p>Thanks for ordering with us. Your order number is <b>{{ masker(orderNumber, 'SSS-#####-##').masked }}</b>.  If you need assistance please call us at <b>{{ facade(phoneNumber, '#-###-###-####').masked }}</b></p>
```