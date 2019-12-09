import {formatter} from '../src/masker'

test('default vals', () => {
  expect(formatter('123')).toBe('')
})

test('12 -> #.#', () => {
  expect(formatter('12', { mask: '#.#' })).toBe('1.2')
})

test('1 -> (#)', () => { // placeholder at the end
  expect(formatter('1', { mask: '(#)' })).toBe('(1)')
})

test('1 -> [(#)]', () => { // two placeholder at the end
  expect(formatter('1', { mask: '[(#)]' })).toBe('[(1)]')
})

test('1 -> #..#', () => {
  expect(formatter('1', { mask: '#..#', short: true })).toBe('1')
})

test('1 -> #.#', () => {
  expect(formatter('1', { mask: '#.#' })).toBe('1.')
})

test('1. -> #.#', () => {
  expect(formatter('1.', { mask: '#.#' })).toBe('1.')
})

test('123 -> #.#', () => {
  expect(formatter('123', { mask: '#.#' })).toBe('1.2')
})

test('raw phone number', () => {
  expect(formatter('44998765432', { mask: '+55 (##) #####-####', masked: false })).toBe('44998765432')
})

test('abc1234567 -> AAa-####', () => {
  expect(formatter('abc1234567', { mask: 'AAa-####' })).toBe('ABc-1234')
})

test('a5-12-34 -> (XX) - ## - ##', () => {
  expect(formatter('a5-12-34', { mask: '(XX) - ## - ##' })).toBe('(a5) - 12 - 34')
})

test('123 -> ##(#)', () => {
  expect(formatter('123', { mask: '##(#)' })).toBe('12(3)')
})

test('123 -> #!#(#)', () => {
  expect(formatter('12', { mask: '#!#(#)' })).toBe('1#(2)')
})

test('12 -> +1 #', () => {
  expect(formatter('12', { mask: '+1 #' })).toBe('+1 2')
})

test('2 -> +1 #', () => {
  expect(formatter('2', { mask: '+1 #' })).toBe('+1 2')
})

test('2 -> +1 # 5', () => {
  expect(formatter('2', { mask: '+1 # 5' })).toBe('+1 2 5')
})
