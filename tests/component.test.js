import InputFacade from '@/component.vue'
import { shallowMount } from '@vue/test-utils'

describe('Component', () => {
  const createWrapper = (options) => shallowMount(InputFacade, { ...options })

  afterEach(() => vi.clearAllMocks())

  test('Initial value', () => {
    const modelValue = '1234'
    const mask = '###-#'
    const wrapper = createWrapper({ props: { modelValue, mask } })

    expect(wrapper.vm.emittedValue).toBe('1234')
    expect(wrapper.vm.unmaskedValue).toBe('1234')
    expect(wrapper.vm.maskedValue).toBe('123-4')
  })

  test('Should not emit input if initial value is null', () => {
    const modelValue = null
    const mask = '####'

    const wrapper = createWrapper({ props: { modelValue, mask } })
    expect(wrapper.emitted('update:model-value')).toBeFalsy()
  })

  test('Updating the value should update the values', async () => {
    const modelValue = '1234'
    const mask = '###-#'
    const wrapper = createWrapper({ props: { modelValue, mask } })

    expect(wrapper.vm.maskedValue).toBe('123-4')
    await wrapper.setProps({ modelValue: '5555' })
    expect(wrapper.vm.maskedValue).toBe('555-5')
  })

  test('Changing the masked prop should re-evaluate the values', async () => {
    const modelValue = '1234'
    const mask = '###-#'
    const wrapper = createWrapper({ props: { modelValue, mask } })

    expect(wrapper.vm.emittedValue).toBe('1234')
    await wrapper.setProps({ masked: true })
    expect(wrapper.vm.emittedValue).toBe('123-4')
  })

  test('Removing the mask rule should set the value to the unmasked value', async () => {
    const modelValue = '444555'
    const mask = '(###)###'

    const wrapper = createWrapper({ props: { modelValue, mask } })
    expect(wrapper.vm.maskedValue).toBe('(444)555')

    await wrapper.setProps({ mask: null })
    expect(wrapper.vm.maskedValue).toBe('444555')

    await wrapper.setProps({ mask })
    expect(wrapper.vm.maskedValue).toBe('(444)555')
  })

  test('When lazy is set to true, should only emit input onChange', async () => {
    const wrapper = createWrapper({
      props: { modelModifiers: { lazy: true } }
    })

    const input = wrapper.find('input')

    await input.trigger('input')
    expect(wrapper.emitted('update:model-value')).toBeFalsy()

    await input.trigger('change')
    expect(wrapper.emitted('update:model-value')).toBeTruthy()
    expect(wrapper.emitted().change).toBeTruthy()
  })

  test('When lazy is set to false, should not emit input on change', async () => {
    const wrapper = createWrapper({
      props: { modelModifiers: { lazy: false } }
    })
    const input = wrapper.find('input')

    await input.trigger('change')
    expect(wrapper.emitted('update:model-value')).toBeFalsy()
  })

  test('Adding a format function should call that function on input', async () => {
    const formatter = vi.fn()
    const wrapper = createWrapper({ props: { formatter } })

    wrapper.element.value = '5555'
    await wrapper.find('input').trigger('input')

    expect(formatter).toHaveBeenCalled()
  })

  test('When a formatter function returns false, do not change input value', async () => {
    const formatter = vi.fn().mockReturnValue(false)
    const wrapper = createWrapper({ props: { modelValue: '1234', formatter } })

    wrapper.element.value = '5555'
    await wrapper.find('input').trigger('input')

    expect(wrapper.vm.maskedValue).toBe('1234')
  })

  test('When a formatter function returns string, set value to masked string', async () => {
    const formatter = vi.fn().mockReturnValue('3344')
    const wrapper = createWrapper({ props: { mask: '##-##', formatter } })

    wrapper.element.value = '5555'
    await wrapper.find('input').trigger('input')

    expect(wrapper.vm.maskedValue).toBe('33-44')
  })

  test('On keyup, should emit keyup event', async () => {
    const wrapper = createWrapper()
    const input = wrapper.find('input')

    expect(wrapper.emitted('keyup')).toBeFalsy()
    await input.trigger('keyup', { key: '6' })
    expect(wrapper.emitted('keyup')).toBeTruthy()
  })

  test('On keydown, should emit keydown event', async () => {
    const wrapper = createWrapper()
    const input = wrapper.find('input')

    expect(wrapper.emitted('keydown')).toBeFalsy()
    await input.trigger('keydown', { key: '6' })
    expect(wrapper.emitted('keydown')).toBeTruthy()
  })

  test('On paste, should emit paste event', () => {
    const wrapper = createWrapper()
    const input = wrapper.find('input')

    expect(wrapper.emitted('paste')).toBeFalsy()

    const pasteEvent = Object.assign(new Event('paste', { bubbles: true, cancelable: true }), {
      clipboardData: {
        getData: () => '4321'
      }
    })
    input.element.dispatchEvent(pasteEvent)

    expect(wrapper.emitted('paste')).toBeTruthy()
  })
})
