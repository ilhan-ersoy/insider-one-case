import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import RaceTrack from './RaceTrack.vue'

describe('RaceTrack', () => {
  it('shows empty state', () => {
    const store = createStore({
      state: {
        program: null,
        currentRoundIndex: 0
      },
      getters: {
        getCurrentRound: () => null
      }
    })

    const wrapper = mount(RaceTrack, {
      global: {
        plugins: [store],
        stubs: {
          HorseIcon: true
        }
      }
    })

    expect(wrapper.text()).toContain('click Generate PROGRAM')
  })

  it('renders running lanes', () => {
    const store = createStore({
      state: {},
      getters: {
        getCurrentRound: () => ({
          roundNumber: 1,
          distance: 1200,
          status: 'running',
          horses: [
            { id: 1, horse_name: 'Horse 1', horse_condition: 50, horse_color: '#111111', lane: 1 },
            { id: 2, horse_name: 'Horse 2', horse_condition: 60, horse_color: '#222222', lane: 2 }
          ]
        })
      }
    })

    const wrapper = mount(RaceTrack, {
      global: {
        plugins: [store],
        stubs: {
          HorseIcon: true
        }
      }
    })

    expect(wrapper.findAll('.lane')).toHaveLength(2)
    expect(wrapper.findAll('.horse-runner.running')).toHaveLength(2)
    expect(wrapper.text()).toContain('1st Lap')
  })
})
