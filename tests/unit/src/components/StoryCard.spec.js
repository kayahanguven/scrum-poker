import { mount } from '@vue/test-utils'
import StoryCard from '@/components/StoryCard.vue'

describe('StoryCard', () => {
  it('point prop', () => {
    let wrapper = mount(StoryCard, {
      propsData: {
        point: 5
      }
    })

    expect(wrapper.vm.point).toBe(5)
    expect(wrapper.find('.story-card-inner').text()).toBe('5')
  })
})