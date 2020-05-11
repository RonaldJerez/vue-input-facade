import { formatter } from '../src/masker'

test('default vals', () => {
  expect(formatter('123')).toMatchObject({ masked: '', unmasked: '' })
})

test('12 -> #.#', () => {
  expect(formatter('12', { mask: '#.#' })).toMatchObject({ masked: '1.2', unmasked: '12' })
})

test('1 -> (#)', () => {
  // placeholder at the end
  expect(formatter('1', { mask: '(#)' })).toMatchObject({ masked: '(1)', unmasked: '1' })
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

test('123 -> ##(#)', () => {
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
  expect(formatter('', { mask: '+1 # 5', prepend: true })).toMatchObject({ masked: '+1 ', unmasked: '' })
})
