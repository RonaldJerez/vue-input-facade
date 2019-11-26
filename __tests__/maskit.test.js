import maskit from '../src/maskit'

test('default vals', () => {
  expect(maskit('123')).toBe('')
})

test('12 -> #.#', () => {
  expect(maskit('12', { mask: '#.#' })).toBe('1.2')
})

test('1 -> (#)', () => { // placeholder at the end
  expect(maskit('1', { mask: '(#)' })).toBe('(1)')
})

test('1 -> [(#)]', () => { // two placeholder at the end
  expect(maskit('1', { mask: '[(#)]' })).toBe('[(1)]')
})

test('1 -> #..#', () => {
  expect(maskit('1', { mask: '#..#', short: true })).toBe('1')
})

test('1 -> #.#', () => {
  expect(maskit('1', { mask: '#.#' })).toBe('1.')
})

test('1. -> #.#', () => {
  expect(maskit('1.', { mask: '#.#' })).toBe('1.')
})

test('123 -> #.#', () => {
  expect(maskit('123', { mask: '#.#' })).toBe('1.2')
})

test('raw phone number', () => {
  expect(maskit('44998765432', { mask: '+55 (##) #####-####', masked: false })).toBe('44998765432')
})

test('abc1234567 -> AAa-####', () => {
  expect(maskit('abc1234567', { mask: 'AAa-####' })).toBe('ABc-1234')
})

test('a5-12-34 -> (XX) - ## - ##', () => {
  expect(maskit('a5-12-34', { mask: '(XX) - ## - ##' })).toBe('(a5) - 12 - 34')
})

test('123 -> ##(#)', () => {
  expect(maskit('123', { mask: '##(#)' })).toBe('12(3)')
})

test('123 -> #!#(#)', () => {
  expect(maskit('12', { mask: '#!#(#)' })).toBe('1#(2)')
})

test('12 -> +1 #', () => {
  expect(maskit('12', { mask: '+1 #' })).toBe('+1 2')
})

test('2 -> +1 #', () => {
  expect(maskit('2', { mask: '+1 #' })).toBe('+1 2')
})

test('2 -> +1 # 5', () => {
  expect(maskit('2', { mask: '+1 # 5' })).toBe('+1 2 5')
})
