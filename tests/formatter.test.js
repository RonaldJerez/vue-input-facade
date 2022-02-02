import { formatter } from '../src/masker'

test('12 -> #.#', () => {
  expect(formatter('12', { mask: '#.#' })).toMatchObject({ masked: '1.2', unmasked: '12' })
})

test('1 -> (#)', () => {
  // placeholder at the end
  expect(formatter('1', { mask: '(#)' })).toMatchObject({ masked: '(1)', unmasked: '1' })
})

test('(1) -> (#)', () => {
  // static mask chars in source
  expect(formatter('(1)', { mask: '(#)' })).toMatchObject({ masked: '(1)', unmasked: '1' })
})

test('1 -> [(#)]', () => {
  // two placeholder at the end
  expect(formatter('1', { mask: '[(#)]' })).toMatchObject({ masked: '[(1)]', unmasked: '1' })
})

test('1 -> #.#', () => {
  expect(formatter('1', { mask: '#.#' })).toMatchObject({ masked: '1.', unmasked: '1' })
})

test('1. -> #.#', () => {
  expect(formatter('1.', { mask: '#.#' })).toMatchObject({ masked: '1.', unmasked: '1' })
})

test('123 -> #.#', () => {
  expect(formatter('123', { mask: '#.#' })).toMatchObject({ masked: '1.2', unmasked: '12' })
})

test('abc1234567 -> AAa-####', () => {
  expect(formatter('abc1234567', { mask: 'AAa-####' })).toMatchObject({ masked: 'ABc-1234', unmasked: 'ABc1234' })
})

test('a5-12-34 -> (XX) - ## - ##', () => {
  expect(formatter('a5-12-34', { mask: '(XX) - ## - ##' })).toMatchObject({
    masked: '(a5) - 12 - 34',
    unmasked: 'a51234'
  })
})

test('123 -> ##(#)', () => {
  expect(formatter('123', { mask: '##(#)' })).toMatchObject({ masked: '12(3)', unmasked: '123' })
})

test('12 -> ##(#)', () => {
  expect(formatter('12', { mask: '#\\#(#)' })).toMatchObject({ masked: '1#(2)', unmasked: '12' })
})

test('12 -> +1 #', () => {
  expect(formatter('12', { mask: '+1 #' })).toMatchObject({ masked: '+1 2', unmasked: '2' })
})

test('2 -> +1 #', () => {
  expect(formatter('2', { mask: '+1 #' })).toMatchObject({ masked: '+1 2', unmasked: '2' })
})

test('2 -> +1 # 5', () => {
  expect(formatter('2', { mask: '+1 # 5' })).toMatchObject({ masked: '+1 2 5', unmasked: '2' })
})

test('empty -> +1 # 5', () => {
  expect(formatter('', { mask: '+1 # 5', prefill: true })).toMatchObject({ masked: '+1 ', unmasked: '' })
})

test('12.345 -> ##?#?.###', () => {
  expect(formatter('12.345', { mask: '##?#?.###' })).toMatchObject({ masked: '12.345', unmasked: '12345' })
})

test('12.3 -> ##?#?.##?#?', () => {
  expect(formatter('12.3', { mask: '##?#?.##?#?' })).toMatchObject({ masked: '12.3', unmasked: '123' })
})

test('123.456 -> ##?#?.##?#?', () => {
  expect(formatter('123.456', { mask: '##?#?.##?#?' })).toMatchObject({ masked: '123.456', unmasked: '123456' })
})

test('21986892332 -> (0##?) #####-####', () => {
  expect(formatter('21986892332', { mask: '(0##?) #####-####' })).toMatchObject({ masked: '(021) 98689-2332', unmasked: '21986892332' })
})

test('2)986892332 -> (0##?) #####-####', () => {
  expect(formatter('2)986892332', { mask: '(0##?) #####-####' })).toMatchObject({ masked: '(02) 98689-2332', unmasked: '2986892332' })
})

test('12.3456abc -> ##?#?.###.#A?a?S', () => {
  expect(formatter('12.3456abc', { mask: '##?#?.###.#A?a?S' })).toMatchObject({ masked: '12.345.6Abc', unmasked: '123456Abc' })
})

test('12.3456ac -> ##?#?.###.##?a?S', () => {
  expect(formatter('12.3456ac', { mask: '##?#?.###.##?a?S' })).toMatchObject({ masked: '12.345.6ac', unmasked: '123456ac' })
})

test('France IBAN', () => {
  expect(
    formatter('FR7630006000011234567890189', {
      mask: 'FR## #### #### #### #### #### ###',
      prefill: true
    })
  ).toMatchObject({
    masked: 'FR76 3000 6000 0112 3456 7890 189',
    unmasked: '7630006000011234567890189'
  })
})
