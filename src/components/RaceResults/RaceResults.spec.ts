import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import RaceResults from './RaceResults.vue'

describe('RaceResults', () => {
  it('shows empty state', () => {
    const store = createStore({
      state: {
        completedRounds: []
      },
      getters: {
        getCompletedRounds: state => state.completedRounds
      }
    })

    const wrapper = mount(RaceResults, {
      global: { plugins: [store] }
    })

    expect(wrapper.text()).toContain('no results yet')
  })

  it('renders results', () => {
    const store = createStore({
      state: {
        completedRounds: [
          {
            roundNumber: 1,
            distance: 1200,
            status: 'completed',
            horses: [],
            results: [
              {
                position: 1,
                time: 3.2,
                horse: { id: 1, horse_name: 'Horse 1', horse_condition: 50, horse_color: '#111111' }
              }
            ]
          }
        ]
      },
      getters: {
        getCompletedRounds: state => state.completedRounds
      }
    })

    const wrapper = mount(RaceResults, {
      global: { plugins: [store] }
    })

    expect(wrapper.findAll('.result-section')).toHaveLength(1)
    expect(wrapper.text()).toContain('Horse 1')
  })
})
