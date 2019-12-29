import facade from '../src/directive'
import { CONFIG_KEY } from '../src/core'
import { shallowMount } from '@vue/test-utils'

describe('Directive', () => {
  let wrapper
  const inputListener = jest.fn()

  const buildWrapper = ({ template, mask = '##.##', value = '', ...rest } = {}) => {
    if (!template) template = `<input v-facade="mask" value="${value}" @input="inputListener" />`

    const component = {
      template,
      directives: { facade },
      methods: { inputListener },
      data() {
        return { mask }
      }
    }

    wrapper = shallowMount(component, { ...rest })
  }

  afterEach(() => {
    jest.restoreAllMocks()
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

  test('Should update element value on input', async () => {
    buildWrapper({ value: 1234 })
    expect(wrapper.element.value).toBe('12.34')

    wrapper.element.value = '1122'
    wrapper.find('input').trigger('input')

    expect(wrapper.element.value).toBe('11.22')
    expect(wrapper.element.unmaskedValue).toBe('1122')
  })

  test('Should not update the cursor position if not the active element', () => {
    buildWrapper({ value: 'ABCDE' })

    jest.spyOn(wrapper.element, 'setSelectionRange')
    expect(wrapper.element.setSelectionRange).not.toBeCalled()
  })

  describe('Cursor updates', () => {
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
      wrapper.find('input').trigger('input')

      expect(wrapper.element.setSelectionRange).toBeCalledWith(newCursorPos, newCursorPos)
    })

    test('Should remain at the end if adding new char at the end', async () => {
      element.value = 'ABC123'
      const cursorPos = element.value.length
      const newCursorPos = cursorPos + 2 // two new characters after masking

      element.selectionEnd = cursorPos
      wrapper.find('input').trigger('input', { data: '3' })

      expect(wrapper.element.setSelectionRange).toBeCalledWith(newCursorPos, newCursorPos)
    })

    test('Should keep cursor at its current position when entering a bad char', async () => {
      element.value = 'ABC-1J|2'
      const cursorPos = element.value.indexOf('|')
      const newCursorPos = cursorPos - 1 // needs to move back as 'j' is not an allowed char

      element.selectionEnd = cursorPos
      wrapper.find('input').trigger('input', { data: 'J' })

      expect(wrapper.element.setSelectionRange).toBeCalledWith(newCursorPos, newCursorPos)
    })
  })
})
