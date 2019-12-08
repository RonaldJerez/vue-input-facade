import mask from '../src/directive'
import { createLocalVue, shallowMount } from '@vue/test-utils'

const maskingConfigKey = '__vueTheMask__'

describe('Directive', () => {
  const localVue = createLocalVue()
  localVue.directive('v-mask', mask)

  const inputListener = jest.fn()

  const baseComponent = {
    template: '<input v-mask="\'##.##\'" value="1234" @input="inputListener" />',
    directives: { mask },
    methods: { inputListener }
  }

  // beforeEach(() => {
  //   jest.spyOn(console, 'error')
  //   console.error.mockImplementation(() => {})
  // })

  afterEach(() => {
    jest.restoreAllMocks()
    // console.error.mockRestore()
  })

  test('should format initial value, and emit input', () => {
    const wrapper = shallowMount(baseComponent, { localVue })
    expect(wrapper.element.value).toBe('12.34')
    expect(inputListener).toBeCalledTimes(1)
  })

  test('add the config object to the element', () => {
    const wrapper = shallowMount(baseComponent, { localVue })
    expect(wrapper.element[maskingConfigKey]).toBeDefined()
  })

  test('update the config when mask changes', () => {
    const mask1 = '###.#'
    const mask2 = '#.###'

    const component = {
      template: '<input v-mask="mask" value="1234" />',
      directives: { mask },
      data() { return { mask: mask1 } }
    }
    const wrapper = shallowMount(component, { localVue })

    expect(wrapper.element[maskingConfigKey].config.mask).toBe(mask1)
    wrapper.setData({ mask: mask2 })
    expect(wrapper.element[maskingConfigKey].config.mask).toBe(mask2)
  })

  // skipping this one as it still shows the error stack in the terminal
  test.skip('throws an error when no input on component', () => {
    const component = {
      template: '<div v-mask="\'####\'" />',
      directives: { mask }
    }
    expect(() => {
      shallowMount(component, { localVue })
    }).toThrow('requires at least 1 input')
  })

  test('should attach to the first input', () => {
    const component = {
      template: `<div v-mask="\'##.##\'">
          <input id="first" value="3344" />
          <input id="second" value="3344" />
        </div>`,
      directives: { mask }
    }

    const wrapper = shallowMount(component, { localVue })
    expect(wrapper.find('#first').element.value).toBe('33.44')
    expect(wrapper.find('#second').element.value).toBe('3344')
  })

  test.skip('should update element value on input', async () => {
    const wrapper = shallowMount(baseComponent, { localVue })
    expect(wrapper.element.value).toBe('12.34')

    wrapper.element.value = '1122'
    wrapper.vm.$el.dispatchEvent(new Event('input'))
    // wrapper.vm.$emit('input')
    await wrapper.vm.$nextTick()
    expect(wrapper.element.value).toBe('11.22')
    // expect(wrapper.emitted().input[0]).toEqual(['11.22'])
  })

})
