import facade from '../src/directive'
import { CONFIG_KEY } from '../src/core'
import { shallowMount } from '@vue/test-utils'

describe('Directive', () => {
  let wrapper
  const inputListener = jest.fn()

  const buildWrapper = ({ template, mask = '##.##', modifiers, value = '', ...rest } = {}) => {
    const directive = modifiers ? `v-facade.${modifiers}` : 'v-facade'
    if (!template) template = `<input ${directive}="mask" value="${value}" @input="inputListener" />`

    const component = {
      template,
      directives: { facade },
      methods: { inputListener },
      data() {
        return { mask, flag: true }
      }
    }

    wrapper = shallowMount(component, { ...rest })
  }

  afterEach(() => {
    jest.restoreAllMocks()
    inputListener.mockReset()
    wrapper && wrapper.destroy()
  })

  test('Initial state on mount', () => {
    buildWrapper({ value: 1234 })

    expect(wrapper.element.value).toBe('12.34')
    expect(inputListener).toBeCalledTimes(1)
    expect(wrapper.element[CONFIG_KEY]).toBeDefined()
  })

  test('Update the config when mask changes', async () => {
    const mask1 = '###.#'
    const mask2 = '#.###'

    buildWrapper({ mask: mask1 })

    expect(wrapper.element[CONFIG_KEY].config.mask).toBe(mask1)
    await wrapper.setData({ mask: mask2 })
    expect(wrapper.element[CONFIG_KEY].config.mask).toBe(mask2)
  })

  test('Should attach to the first input of parent wrapper', () => {
    const template = `<div v-facade="mask">
        <input id="first" value="3344" />
        <input id="second" value="3344" />
      </div>`

    buildWrapper({ template, mask: '##.##' })
    expect(wrapper.find('#first').element.value).toBe('33.44')
    expect(wrapper.find('#second').element.value).toBe('3344')
  })

  test('Removing a masked input from the DOM should not impact other masked inputs in the same container', async () => {
    const template = `<div id='owner'>
        <input v-facade="mask" id="first" />
        <input v-if="flag" v-facade="mask" id="second" />
      </div>`

    buildWrapper({ template, mask: '##.##' })

    wrapper.find('#first').setValue('1111')
    wrapper.find('#second').setValue('1111')

    expect(wrapper.find('#first').element.value).toBe('11.11')
    expect(wrapper.find('#second').element.value).toBe('11.11')

    // remove #second input from DOM, triggering directive unbind
    await wrapper.setData({ flag: false })
    expect(wrapper.find('#second').exists()).toBeFalsy()

    // ensure #first input is still being masked
    wrapper.find('#first').setValue('1122')
    expect(wrapper.find('#first').element.value).toBe('11.22')
  })

  test('Should update element value on input', async () => {
    buildWrapper({ value: 1234 })
    expect(wrapper.element.value).toBe('12.34')

    wrapper.element.value = '1122'
    wrapper.find('input').trigger('input')

    expect(wrapper.element.value).toBe('11.22')
    expect(wrapper.element.unmaskedValue).toBe('1122')
  })

  describe('Composition events', () => {
    test('Should not update value when composing the input', () => {
      buildWrapper({ value: 1234 })
      expect(wrapper.element.value).toBe('12.34')

      wrapper.element.value = '1122'
      wrapper.find('input').trigger('compositionstart')
      wrapper.find('input').trigger('input', { inputType: 'insertCompositionText' })

      expect(wrapper.element.value).toBe('1122')
      expect(wrapper.element.unmaskedValue).toBe('1234')
    })

    test('Should not update value when updating the composed input', () => {
      buildWrapper({ value: 1234 })
      expect(wrapper.element.value).toBe('12.34')

      wrapper.element.value = '1122'
      wrapper.find('input').trigger('compositionupdate')
      wrapper.find('input').trigger('input', { inputType: 'insertCompositionText' })

      expect(wrapper.element.value).toBe('1122')
      expect(wrapper.element.unmaskedValue).toBe('1234')
    })

    test('Should update value when composition ends', () => {
      buildWrapper({ value: 1234 })
      expect(wrapper.element.value).toBe('12.34')

      wrapper.element.value = '1122'
      wrapper.find('input').trigger('compositionstart')
      wrapper.find('input').trigger('input', { inputType: 'insertCompositionText' })

      expect(wrapper.element.value).toBe('1122')
      expect(wrapper.element.unmaskedValue).toBe('1234')

      wrapper.find('input').trigger('compositionend')

      expect(wrapper.element.value).toBe('11.22')
      expect(wrapper.element.unmaskedValue).toBe('1122')
    })

    test('Should prevent all value updates while composing text', () => {
      buildWrapper({ value: 1234 })
      expect(wrapper.element.value).toBe('12.34')

      wrapper.element.value = '1122'
      wrapper.find('input').trigger('compositionstart')
      wrapper.find('input').trigger('input', { inputType: 'insertCompositionText' })
      wrapper.setValue('4321')

      expect(wrapper.element.value).toBe('4321')
      expect(wrapper.element.unmaskedValue).toBe('1234')
    })

    test('Should prevent composition input events from propagating', () => {
      buildWrapper()

      wrapper.find('input').trigger('input', { inputType: 'insertCompositionText' })
      wrapper.find('input').trigger('input', { inputType: 'insertFromComposition' })

      expect(inputListener).toHaveBeenCalledTimes(0)
    })
  })

  test('Should honor short modifier', async () => {
    buildWrapper({
      template: `<input v-facade.short="mask" value="12" @input="inputListener" />`
    })
    expect(wrapper.element.value).toBe('12')

    wrapper.element.value = '1234'
    wrapper.find('input').trigger('input')

    expect(wrapper.element.value).toBe('12.34')
    expect(wrapper.element.unmaskedValue).toBe('1234')
  })

  test('Should not update the cursor position if not the active element', () => {
    buildWrapper({ value: 'ABCDE' })

    jest.spyOn(wrapper.element, 'setSelectionRange')
    expect(wrapper.element.setSelectionRange).not.toBeCalled()
  })

  describe('Directive Modifiers', () => {
    test('Should honor short modifier', async () => {
      buildWrapper({ modifiers: 'short', value: '12' })
      expect(wrapper.element.value).toBe('12')

      wrapper.element.value = '1234'
      wrapper.find('input').trigger('input')

      expect(wrapper.element.value).toBe('12.34')
      expect(wrapper.element.unmaskedValue).toBe('1234')
    })

    test('Should honor prefill modifier', async () => {
      buildWrapper({ modifiers: 'prefill', mask: '+1 ###', value: '' })
      expect(wrapper.element.value).toBe('+1 ')

      wrapper.element.value = '777'
      wrapper.find('input').trigger('input')

      expect(wrapper.element.value).toBe('+1 777')
      expect(wrapper.element.unmaskedValue).toBe('777')
    })
  })

  describe.each([['insertText'], [undefined]])('Cursor updates (inputType = %s)', (inputType) => {
    let element

    beforeEach(() => {
      buildWrapper({ mask: 'AAA-###-', attachToDocument: true })

      element = wrapper.element

      jest.spyOn(element, 'setSelectionRange')
      element.focus()
    })

    // We are using a pipe "|" to visualize where the cursor is
    test('Should stay next to the char just inserted', () => {
      element.value = 'ABC1|23'
      const cursorPos = element.value.indexOf('|')
      const newCursorPos = cursorPos + 1 // one new char inserted before

      element.selectionEnd = cursorPos
      wrapper.find('input').trigger('input', { inputType })

      expect(wrapper.element.setSelectionRange).toBeCalledWith(newCursorPos, newCursorPos)
    })

    test('Should stay next to the char just inserted', () => {
      element.value = 'ABC1|23'
      const cursorPos = element.value.indexOf('|')
      const newCursorPos = cursorPos + 1 // one new char inserted before

      element.selectionEnd = cursorPos
      wrapper.find('input').trigger('input', { inputType })

      expect(wrapper.element.setSelectionRange).toBeCalledWith(newCursorPos, newCursorPos)
    })

    test('Should remain at the end if adding new char at the end', async () => {
      element.value = 'ABC123'
      const cursorPos = element.value.length
      const newCursorPos = cursorPos + 2 // two new characters after masking

      element.selectionEnd = cursorPos
      wrapper.find('input').trigger('input', { inputType })

      expect(wrapper.element.setSelectionRange).toBeCalledWith(newCursorPos, newCursorPos)
    })

    test('Should keep cursor at its current position when entering a bad char', async () => {
      element.value = 'ABC-1J|2'
      const cursorPos = element.value.indexOf('|')
      const newCursorPos = cursorPos - 1 // needs to move back as 'j' is not an allowed char

      element.selectionEnd = cursorPos
      wrapper.find('input').trigger('input', { inputType })

      expect(wrapper.element.setSelectionRange).toBeCalledWith(newCursorPos, newCursorPos)
    })

    test('should not reset cursor if no mask is given', async () => {
      buildWrapper({ mask: '', attachToDocument: true })
      element = wrapper.element
      jest.spyOn(element, 'setSelectionRange')
      element.focus()
      element.value = 'ABC-1J|2'
      const cursorPos = element.value.indexOf('|')
      element.selectionEnd = cursorPos
      wrapper.find('input').trigger('input', { inputType })
      expect(wrapper.element.setSelectionRange).not.toBeCalled()
    })
  })

  describe('multiple inputs, one facade', () => {
    let otherInput
    let facadeInput

    beforeEach(() => {
      const template = `<div id="wrapper">
      <input id="first" v-facade="mask" value="" @input="inputListener" />
      <input id="second" />
      </div>`
      buildWrapper({ template })
      otherInput = wrapper.find('#second')
      facadeInput = wrapper.find('#first')
    })

    test('should not emit for other inputs', async () => {
      otherInput.setValue('1122')

      expect(otherInput.element.value).toBe('1122')
      expect(facadeInput.element.value).toBe('')
      expect(inputListener).toBeCalledTimes(0)
    })

    test('should still handle inputs for the main element', async () => {
      facadeInput.setValue('1122')

      expect(otherInput.element.value).toBe('')
      expect(facadeInput.element.value).toBe('11.22')

      otherInput.setValue('2233')

      expect(otherInput.element.value).toBe('2233')
      expect(facadeInput.element.value).toBe('11.22')

      expect(inputListener).toBeCalledTimes(1)
    })

    test('should not prevent updates when other inputs are composing text', async () => {
      otherInput.setValue('1122')

      otherInput.trigger('compositionstart')

      facadeInput.element.value = '1234'
      facadeInput.trigger('input')

      expect(otherInput.element.value).toBe('1122')
      expect(facadeInput.element.value).toBe('12.34')
      expect(inputListener).toBeCalledTimes(1)
    })

    test('should handle composition events on the main element', async () => {
      facadeInput.setValue('1122')
      facadeInput.element.value = '1234'
      facadeInput.trigger('compositionstart')
      facadeInput.trigger('input', { inputType: 'insertCompositionText' })

      expect(facadeInput.element.unmaskedValue).toBe('1122')
    })
  })
})
