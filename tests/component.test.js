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

  test('When lazy is set to true, should only input onChange', async () => {
    // default settings
    const wrapper = createWrapper({ lazy: true })
    const input = wrapper.find('input')

    input.trigger('input')
    expect(wrapper.emitted().input).toBeFalsy()

    input.trigger('change')
    expect(wrapper.emitted().input).toBeTruthy()
  })

  test('Adding a pipe function should call that function on input', async () => {
    const piper = jest.fn()
    const wrapper = createWrapper({ pipe: piper})

    wrapper.element.value = '5555'
    wrapper.find('input').trigger('input')

    expect(piper).toHaveBeenCalled()
  })

  test('When pipe function returns false, do not change input value', async () => {
    const piper = jest.fn().mockReturnValue(false)
    const wrapper = createWrapper({ value: '1234', pipe: piper })

    wrapper.element.value = '5555'
    wrapper.find('input').trigger('input')

    expect(wrapper.vm.maskedValue).toBe('1234')
  })

  test('When pipe function returns string, set value to masked string', async () => {
    const piper = jest.fn().mockReturnValue('3344')
    const wrapper = createWrapper({ mask: '##-##', pipe: piper })

    wrapper.element.value = '5555'
    wrapper.find('input').trigger('input')

    expect(wrapper.vm.maskedValue).toBe('33-44')
  })
})
