import masker, { setTokens } from '../src/masker'

const tokens = {
  F: { pattern: /[a-f0-9]/i }
}

test('no errors with invalid input to public interface', () => {
  expect(masker()).toMatchObject({ masked: '', unmasked: '' })
  expect(masker(null)).toMatchObject({ masked: '', unmasked: '' })
  expect(masker(null, null)).toMatchObject({ masked: '', unmasked: '' })
  expect(masker(null, { mask: null })).toMatchObject({ masked: '', unmasked: '' })
})

test('no mask given, value should be returned as is', () => {
  expect(masker('123')).toMatchObject({ masked: '123', unmasked: '123' })
  expect(masker('123', null)).toMatchObject({ masked: '123', unmasked: '123' })
  expect(masker('123', { mask : null })).toMatchObject({ masked: '123', unmasked: '123' })
})

test('single mask given', () => {
  expect(masker('12', { mask: '#.#' })).toMatchObject({ masked: '1.2', unmasked: '12' })
})

test('multiple mask given', () => {
  const config = { mask: ['#.#', '##.#'] }
  expect(masker('12', config)).toMatchObject({ masked: '1.2', unmasked: '12' })
  expect(masker('123', config)).toMatchObject({ masked: '12.3', unmasked: '123' })
})

test('should just append to the tokens when passing them in locally', () => {
  expect(masker('456DDS', { mask: '###-FFFF', tokens })).toMatchObject({ masked: '456-DD', unmasked: '456DD' })
})

test('should override default tokens globally', () => {
  setTokens(tokens)
  expect(masker('456DDS', { mask: '###-FFFF' })).toMatchObject({ masked: '###-456D', unmasked: '456D' })
})
