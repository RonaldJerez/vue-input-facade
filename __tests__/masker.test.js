import masker from '../src/masker'

test('no mask given', () => {
  expect(masker('123')).toBe('123')
})

test('single mask given', () => {
  expect(masker('12', { mask: '#.#' })).toBe('1.2')
})

test('multiple mask given', () => {
  const config = { mask: ['#.#', '##.#'] }
  expect(masker('12', config)).toBe('1.2')
  expect(masker('123', config)).toBe('12.3')
})