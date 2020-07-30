import InputFacade from '../src/component'
import { shallowMount } from '@vue/test-utils'

describe('Component', () => {
  const createWrapper = (props) => shallowMount(InputFacade, { propsData: props })

  afterEach(() => jest.clearAllMocks())

  test('Initial value', () => {
    const value = '1234'
    const mask = '###-#'
    const wrapper = createWrapper({ value, mask })

    expect(wrapper.vm.emittedValue).toBe('1234')
    expect(wrapper.vm.unmaskedValue).toBe('1234')
    expect(wrapper.vm.maskedValue).toBe('123-4')
  })

  test('Should not emit input if initial value is null', () => {
    const value = null
    const mask = '####'

    const wrapper = createWrapper({ value, mask })
    expect(wrapper.emitted().input).toBeFalsy()
  })

  test('Updating the value should update the values', async () => {
    const value = '1234'
    const mask = '###-#'
    const wrapper = createWrapper({ value, mask })

    expect(wrapper.vm.maskedValue).toBe('123-4')
    await wrapper.setProps({ value: '5555' })
    expect(wrapper.vm.maskedValue).toBe('555-5')
  })

  test('Changing the masked prop should re-evaluate the values', async () => {
    const value = '1234'
    const mask = '###-#'
    const wrapper = createWrapper({ value, mask })

    expect(wrapper.vm.emittedValue).toBe('1234')
    await wrapper.setProps({ masked: true })
    expect(wrapper.vm.emittedValue).toBe('123-4')
  })

  test('Removing the mask rule should set the value to the unmasked value', async () => {
    const value = '444555'
    const mask = '(###)###'

    const wrapper = createWrapper({ value, mask })
    expect(wrapper.vm.maskedValue).toBe('(444)555')

    await wrapper.setProps({ mask: null })
    expect(wrapper.vm.maskedValue).toBe('444555')

    await wrapper.setProps({ mask })
    expect(wrapper.vm.maskedValue).toBe('(444)555')
  })

  test('When lazy is set to true, should only emit input onChange', async () => {
    // default settings
    const wrapper = createWrapper({ lazy: true })
    const input = wrapper.find('input')

    input.trigger('input')
    expect(wrapper.emitted().input).toBeFalsy()

    input.trigger('change')
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().change).toBeTruthy()
  })

  test('When lazy is set to false, should not emit input on change', async () => {
    // default settings
    const wrapper = createWrapper({ lazy: false })
    const input = wrapper.find('input')

    input.trigger('change')
    expect(wrapper.emitted().input).toBeFalsy()
  })

  test('Adding a format function should call that function on input', async () => {
    const formatter = jest.fn()
    const wrapper = createWrapper({ formatter })

    wrapper.element.value = '5555'
    wrapper.find('input').trigger('input')

    expect(formatter).toHaveBeenCalled()
  })

  test('When a formatter function returns false, do not change input value', async () => {
    const formatter = jest.fn().mockReturnValue(false)
    const wrapper = createWrapper({ value: '1234', formatter })

    wrapper.element.value = '5555'
    wrapper.find('input').trigger('input')

    expect(wrapper.vm.maskedValue).toBe('1234')
  })

  test('When a formatter function returns string, set value to masked string', async () => {
    const formatter = jest.fn().mockReturnValue('3344')
    const wrapper = createWrapper({ mask: '##-##', formatter })

    wrapper.element.value = '5555'
    wrapper.find('input').trigger('input')

    expect(wrapper.vm.maskedValue).toBe('33-44')
  })
})
