import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import RaceProgram from './RaceProgram.vue'

describe('RaceProgram', () => {
  it('shows empty state', () => {
    const store = createStore({
      state: {
        program: null,
        currentRoundIndex: 0
      },
      getters: {
        getRaceProgram: state => state.program,
        getCurrentRoundIndex: state => state.currentRoundIndex
      }
    })

    const wrapper = mount(RaceProgram, {
      global: { plugins: [store] }
    })

    expect(wrapper.text()).toContain('no program')
  })

  it('renders rounds states', () => {
    const store = createStore({
      state: {
        program: {
          rounds: [
            {
              roundNumber: 1,
              distance: 1200,
              status: 'completed',
              horses: [{ id: 1, horse_name: 'Horse 1', horse_condition: 40, horse_color: '#111111', lane: 1 }]
            },
            {
              roundNumber: 2,
              distance: 1400,
              status: 'pending',
              horses: [{ id: 2, horse_name: 'Horse 2', horse_condition: 55, horse_color: '#222222', lane: 1 }]
            }
          ]
        },
        currentRoundIndex: 1
      },
      getters: {
        getRaceProgram: state => state.program,
        getCurrentRoundIndex: state => state.currentRoundIndex
      }
    })

    const wrapper = mount(RaceProgram, {
      global: { plugins: [store] }
    })

    const items = wrapper.findAll('.program-item')
    expect(items).toHaveLength(2)
    expect(items[0]).toBeDefined()
    expect(items[1]).toBeDefined()
    expect(items[0]!.classes()).toContain('completed')
    expect(items[1]!.classes()).toContain('active')
    expect(wrapper.text()).toContain('Horse 2')
  })
})
