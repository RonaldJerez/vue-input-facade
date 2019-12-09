import {dynamic} from '../src/masker'

test ('empty', () => {
  var masks = []
  expect(dynamic('12345', { masks })).toBe('')
})

test ('single', () => {
  var masks = ['#.#']
  expect(dynamic('12', { masks })).toBe('1.2')
  expect(dynamic('321', { masks })).toBe('3.2')
})

test ('CEP USA/BR', () => {
  var masks = ['#####', '#####-###']
  expect(dynamic('12345', { masks })).toBe('12345')
  expect(dynamic('123456', { masks })).toBe('12345-6')
  expect(dynamic('12345678', { masks })).toBe('12345-678')
})

test ('Reverse CEP USA/BR', () => {
  var masks = ['#####-###', '#####']
  expect(dynamic('12345', { masks })).toBe('12345')
  expect(dynamic('123456', { masks })).toBe('12345-6')
  expect(dynamic('12345678', { masks })).toBe('12345-678')
})

test ('cpf/cnpj', () => {
  var masks = ['###.###.###-##', '##.###.###/####-##']
  expect(dynamic('12345678901', { masks })).toBe('123.456.789-01')
  expect(dynamic('123456789012', { masks })).toBe('12.345.678/9012-')
})

test ('bank agency', () => {
  var masks = ['####', '####-#', '####-##']
  expect(dynamic('1234', { masks })).toBe('1234')
  expect(dynamic('12345', { masks })).toBe('1234-5')
  expect(dynamic('123456', { masks })).toBe('1234-56')
})

test ('bank account', () => {
  //            12345      123456      1234567      12345678      123456789
  var masks = ['#####-#', '######-#', '#######-#', '########-#', '#########-#']
  expect(dynamic('123456', { masks })).toBe('12345-6')
  expect(dynamic('1234567', { masks })).toBe('123456-7')
  expect(dynamic('12345678', { masks })).toBe('1234567-8')
  expect(dynamic('123456789', { masks })).toBe('12345678-9')
  expect(dynamic('1234567890', { masks })).toBe('123456789-0')
})
