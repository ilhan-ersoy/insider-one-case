import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import HorseList from './HorseList.vue'

describe('HorseList', () => {
  it('renders horses', () => {
    const store = createStore({
      state: {
        allHorses: [
          { id: 1, horse_name: 'Horse 1', horse_condition: 50, horse_color: '#111111' },
          { id: 2, horse_name: 'Horse 2', horse_condition: 75, horse_color: '#222222' }
        ]
      },
      getters: {
        getAllHorses: state => state.allHorses
      }
    })

    const wrapper = mount(HorseList, {
      global: { plugins: [store] }
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(2)
    expect(wrapper.text()).toContain('Horse 1')
    expect(wrapper.text()).toContain('Horse 2')
  })
})
