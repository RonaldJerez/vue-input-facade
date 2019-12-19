import masker, { setTokens } from '../src/masker'

test('no mask given', () => {
  expect(masker('123')).toMatchObject({masked: '123', raw: '123'})
})

test('single mask given', () => {
  expect(masker('12', { mask: '#.#' })).toMatchObject({masked: '1.2', raw: '12' })
})

test('multiple mask given', () => {
  const config = { mask: ['#.#', '##.#'] }
  expect(masker('12', config)).toMatchObject({ masked: '1.2', raw: '12' })
  expect(masker('123', config)).toMatchObject({ masked: '12.3', raw: '123' })
})

test('should override default tokens', () => {
  const tokens = {
    'F': { pattern: /[a-f0-9]/i },
  }
  setTokens(tokens)
  expect(masker('1DFS', { mask: '#FFFF'})).toMatchObject({ masked: '#1DF', raw: '1DF' })
})