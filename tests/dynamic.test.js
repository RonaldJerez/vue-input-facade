import { dynamic } from '../src/masker'

test('empty', () => {
  var masks = []
  expect(dynamic('12345', { masks })).toMatchObject({ masked: '', unmasked: '' })
})

test('single', () => {
  var masks = ['#.#']
  expect(dynamic('12', { masks })).toMatchObject({ masked: '1.2', unmasked: '12' })
  expect(dynamic('321', { masks })).toMatchObject({ masked: '3.2', unmasked: '32' })
})

test('CEP USA/BR', () => {
  var masks = ['#####', '#####-###']
  expect(dynamic('12345', { masks })).toMatchObject({ masked: '12345', unmasked: '12345' })
  expect(dynamic('123456', { masks })).toMatchObject({ masked: '12345-6', unmasked: '123456' })
  expect(dynamic('12345678', { masks })).toMatchObject({ masked: '12345-678', unmasked: '12345678' })
})

test('Reverse CEP USA/BR', () => {
  var masks = ['#####-###', '#####']
  expect(dynamic('12345', { masks })).toMatchObject({ masked: '12345', unmasked: '12345' })
  expect(dynamic('123456', { masks })).toMatchObject({ masked: '12345-6', unmasked: '123456' })
  expect(dynamic('12345678', { masks })).toMatchObject({ masked: '12345-678', unmasked: '12345678' })
})

test('cpf/cnpj', () => {
  var masks = ['###.###.###-##', '##.###.###/####-##']
  expect(dynamic('12345678901', { masks })).toMatchObject({ masked: '123.456.789-01', unmasked: '12345678901' })
  expect(dynamic('123456789012', { masks })).toMatchObject({ masked: '12.345.678/9012-', unmasked: '123456789012' })
})

test('bank agency', () => {
  var masks = ['####', '####-#', '####-##']
  expect(dynamic('1234', { masks })).toMatchObject({ masked: '1234', unmasked: '1234' })
  expect(dynamic('1234a', { masks })).toMatchObject({ masked: '1234', unmasked: '1234' })
  expect(dynamic('12345', { masks })).toMatchObject({ masked: '1234-5', unmasked: '12345' })
  expect(dynamic('123456', { masks })).toMatchObject({ masked: '1234-56', unmasked: '123456' })
})

test('bank account', () => {
  //            12345      123456      1234567      12345678      123456789
  var masks = ['#####-#', '######-#', '#######-#', '########-#', '#########-#']
  expect(dynamic('123456', { masks })).toMatchObject({ masked: '12345-6', unmasked: '123456' })
  expect(dynamic('1234567', { masks })).toMatchObject({ masked: '123456-7', unmasked: '1234567' })
  expect(dynamic('12345678', { masks })).toMatchObject({ masked: '1234567-8', unmasked: '12345678' })
  expect(dynamic('123456789', { masks })).toMatchObject({ masked: '12345678-9', unmasked: '123456789' })
  expect(dynamic('1234567890', { masks })).toMatchObject({ masked: '123456789-0', unmasked: '1234567890' })
})

test('US Currency', () => {
  var masks = ['$###', '$#,###', '$##,###', '$###,###']
  expect(dynamic('12', { masks })).toMatchObject({ masked: '$12', unmasked: '12' })
  expect(dynamic('123', { masks })).toMatchObject({ masked: '$123', unmasked: '123' })
  expect(dynamic('1234', { masks })).toMatchObject({ masked: '$1,234', unmasked: '1234' })
  expect(dynamic('12345', { masks })).toMatchObject({ masked: '$12,345', unmasked: '12345' })
  expect(dynamic('123456', { masks })).toMatchObject({ masked: '$123,456', unmasked: '123456' })
})

test('UK Postal code', () => {
  var masks = ['A# #AA', 'AXX #AA', 'AA#X #AA']
  expect(dynamic('B11', { masks })).toMatchObject({ masked: 'B1 1', unmasked: 'B11' })
  expect(dynamic('B112', { masks })).toMatchObject({ masked: 'B11 2', unmasked: 'B112' })
  expect(dynamic('BB99', { masks })).toMatchObject({ masked: 'BB9 9', unmasked: 'BB99' })
  expect(dynamic('BB990', { masks })).toMatchObject({ masked: 'BB99 0', unmasked: 'BB990' })
})
