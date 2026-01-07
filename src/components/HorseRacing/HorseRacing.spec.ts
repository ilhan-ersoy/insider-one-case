import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { nextTick } from 'vue'
import HorseRacing from './HorseRacing.vue'

describe('HorseRacing', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('dispatches on mount', () => {
    const store = createStore({
      state: {
        program: null,
        isRacing: false,
        currentRoundIndex: 0
      },
      getters: {
        getRaceProgram: state => state.program,
        isRacing: state => state.isRacing,
        getCurrentRoundIndex: state => state.currentRoundIndex
      },
      actions: {
        generateHorses: vi.fn()
      }
    })

    const dispatchSpy = vi.spyOn(store, 'dispatch')
    const wrapper = mount(HorseRacing, {
      global: {
        plugins: [store],
        stubs: {
          HorseList: true,
          RaceTrack: true,
          RaceProgram: true,
          RaceResults: true
        }
      }
    })

    expect(dispatchSpy).toHaveBeenCalledWith('generateHorses')
    const startButton = wrapper.find('button.start')
    expect(startButton.element.hasAttribute('disabled')).toBe(true)
  })

  it('starts race next', async () => {
    const store = createStore({
      state: {
        program: { rounds: [] },
        isRacing: false,
        currentRoundIndex: 0
      },
      getters: {
        getRaceProgram: state => state.program,
        isRacing: state => state.isRacing,
        getCurrentRoundIndex: state => state.currentRoundIndex
      },
      actions: {
        generateHorses: vi.fn(),
        generateProgram: vi.fn(),
        startRace: vi.fn(() => Promise.resolve()),
        nextRound: vi.fn()
      }
    })

    const dispatchSpy = vi.spyOn(store, 'dispatch')
    const wrapper = mount(HorseRacing, {
      global: {
        plugins: [store],
        stubs: {
          HorseList: true,
          RaceTrack: true,
          RaceProgram: true,
          RaceResults: true
        }
      }
    })

    await nextTick()

    const generateButton = wrapper.find('button.generate')
    await generateButton.trigger('click')
    expect(dispatchSpy).toHaveBeenCalledWith('generateProgram')

    const startButton = wrapper.find('button.start')
    await startButton.trigger('click')

    expect(dispatchSpy).toHaveBeenCalledWith('startRace')

    vi.advanceTimersByTime(4000)
    expect(dispatchSpy).toHaveBeenCalledWith('nextRound')
  })
})
