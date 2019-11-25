import maskit from '../src/maskit'
import tokens from '../src/tokens'

test('default vals', () => {
  expect(maskit('123', undefined, undefined, tokens)).toBe('')
})

test('12 -> #.#', () => {
  expect(maskit('12', '#.#', true, tokens)).toBe('1.2')
})

test('1 -> (#)', () => { // placeholder at the end
  expect(maskit('1', '(#)', true, tokens)).toBe('(1)')
})

test('1 -> [(#)]', () => { // two placeholder at the end
  expect(maskit('1', '[(#)]', true, tokens)).toBe('[(1)]')
})

test('1 -> #.#', () => {
  expect(maskit('1', '#.#', true, tokens)).toBe('1.')
})

test('1. -> #.#', () => {
  expect(maskit('1.', '#.#', true, tokens)).toBe('1.')
})

test('123 -> #.#', () => {
  expect(maskit('123', '#.#', true, tokens)).toBe('1.2')
})

test('raw phone number', () => {
  expect(maskit('44998765432', '+55 (##) #####-####', false, tokens)).toBe('44998765432')
})

test('abc1234567 -> AAa-####', () => {
  expect(maskit('abc1234567', 'AAa-####', true, tokens)).toBe('ABc-1234')
})

test('a5-12-34 -> (XX) - ## - ##', () => {
  expect(maskit('a5-12-34', '(XX) - ## - ##', true, tokens)).toBe('(a5) - 12 - 34')
})

test('123 -> ##(#)', () => {
  expect(maskit('123', '##(#)', true, tokens)).toBe('12(3)')
})

test('123 -> #!#(#)', () => {
  expect(maskit('12', '#!#(#)', true, tokens)).toBe('1#(2)')
})

test('12 -> +1 #', () => {
  expect(maskit('12', '+1 #', true, tokens)).toBe('+1 2')
})

test('2 -> +1 #', () => {
  expect(maskit('2', '+1 #', true, tokens)).toBe('+1 2')
})

test('2 -> +1 # 5', () => {
  expect(maskit('2', '+1 # 5', true, tokens)).toBe('+1 2 5')
})
