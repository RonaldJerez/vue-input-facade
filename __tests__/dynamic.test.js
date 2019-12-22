import {dynamic} from '../src/masker'

test ('empty', () => {
  var masks = []
  expect(dynamic('12345', { masks })).toMatchObject({ masked: '', raw: ''})
})

test ('single', () => {
  var masks = ['#.#']
  expect(dynamic('12', { masks })).toMatchObject({ masked: '1.2', raw: '12'})
  expect(dynamic('321', { masks })).toMatchObject({ masked: '3.2', raw: '32'})
})

test ('CEP USA/BR', () => {
  var masks = ['#####', '#####-###']
  expect(dynamic('12345', { masks })).toMatchObject({ masked: '12345', raw: '12345'})
  expect(dynamic('123456', { masks })).toMatchObject({ masked: '12345-6', raw: '123456'})
  expect(dynamic('12345678', { masks })).toMatchObject({ masked: '12345-678', raw: '12345678'})
})

test ('Reverse CEP USA/BR', () => {
  var masks = ['#####-###', '#####']
  expect(dynamic('12345', { masks })).toMatchObject({ masked: '12345', raw: '12345'})
  expect(dynamic('123456', { masks })).toMatchObject({ masked: '12345-6', raw: '123456'})
  expect(dynamic('12345678', { masks })).toMatchObject({ masked: '12345-678', raw: '12345678'})
})

test ('cpf/cnpj', () => {
  var masks = ['###.###.###-##', '##.###.###/####-##']
  expect(dynamic('12345678901', { masks })).toMatchObject({ masked: '123.456.789-01', raw: '12345678901'})
  expect(dynamic('123456789012', { masks })).toMatchObject({ masked: '12.345.678/9012-', raw: '123456789012'})
})

test ('bank agency', () => {
  var masks = ['####', '####-#', '####-##']
  expect(dynamic('1234', { masks })).toMatchObject({ masked: '1234', raw: '1234'})
  expect(dynamic('1234a', { masks })).toMatchObject({ masked: '1234', raw: '1234'})
  expect(dynamic('12345', { masks })).toMatchObject({ masked: '1234-5', raw: '12345'})
  expect(dynamic('123456', { masks })).toMatchObject({ masked: '1234-56', raw: '123456'})
})

test ('bank account', () => {
  //            12345      123456      1234567      12345678      123456789
  var masks = ['#####-#', '######-#', '#######-#', '########-#', '#########-#']
  expect(dynamic('123456', { masks })).toMatchObject({ masked: '12345-6', raw: '123456'})
  expect(dynamic('1234567', { masks })).toMatchObject({ masked: '123456-7', raw: '1234567'})
  expect(dynamic('12345678', { masks })).toMatchObject({ masked: '1234567-8', raw: '12345678'})
  expect(dynamic('123456789', { masks })).toMatchObject({ masked: '12345678-9', raw: '123456789'})
  expect(dynamic('1234567890', { masks })).toMatchObject({ masked: '123456789-0', raw: '1234567890'})
})
