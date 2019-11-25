import masker from '../src/masker'

test('no mask given', () => {
  expect(masker('123', null)).toBe('123')
})

test('single mask given', () => {
  expect(masker('12', '#.#')).toBe('1.2')
})

test('multiple mask given', () => {
  const masks = ['#.#', '##.#']
  expect(masker('12', masks)).toBe('1.2')
  expect(masker('123', masks)).toBe('12.3')
})