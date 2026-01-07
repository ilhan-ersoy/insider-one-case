import { describe, it, expect, beforeEach } from 'vitest'
import { store } from './index'
import type { Horse, RaceResult, Round } from '@/types'

describe('Vuex Store', () => {
  beforeEach(() => {
    store.commit('RESET_RACE')
  })

  describe('Horse Generation', () => {
    it('generates horse count', () => {
      store.dispatch('generateHorses')
      const horses = store.getters.getAllHorses

      expect(horses).toHaveLength(20)
    })

    it('has horse stats', () => {
      store.dispatch('generateHorses')
      const horses = store.getters.getAllHorses

      horses.forEach((horse: Horse) => {
        expect(horse.horse_name).toBeTruthy()
        expect(horse.horse_condition).toBeGreaterThan(0)
        expect(horse.horse_condition).toBeLessThanOrEqual(100)
      })
    })
  })

  describe('Program Generation', () => {
    it('generates six rounds', () => {
      store.dispatch('generateHorses')
      store.dispatch('generateProgram')
      const program = store.getters.getRaceProgram

      expect(program.rounds).toHaveLength(6)
    })

    it('has ten horses', () => {
      store.dispatch('generateHorses')
      store.dispatch('generateProgram')
      const program = store.getters.getRaceProgram

      program.rounds.forEach((round: Round) => {
        expect(round.horses).toHaveLength(10)
      })
    })

    it('has correct distances', () => {
      store.dispatch('generateHorses')
      store.dispatch('generateProgram')
      const program = store.getters.getRaceProgram

      const expectedDistances = [1200, 1400, 1600, 1800, 2000, 2200]

      program.rounds.forEach((round: Round, index: number) => {
        expect(round.distance).toBe(expectedDistances[index])
      })
    })
  })

  describe('Race Simulation', () => {
    it('marks round running', async () => {
      store.dispatch('generateHorses')
      store.dispatch('generateProgram')

      const racePromise = store.dispatch('startRace')

      expect(store.getters.isRacing).toBe(true)

      await racePromise
    }, 10000)

    it('produces positions', async () => {
      store.dispatch('generateHorses')
      store.dispatch('generateProgram')

      await store.dispatch('startRace')

      const completedRounds = store.getters.getCompletedRounds
      expect(completedRounds).toHaveLength(1)

      const results = completedRounds[0].results
      expect(results).toHaveLength(10)

      results.forEach((result: RaceResult, index: number) => {
        expect(result.position).toBe(index + 1)
      })
    }, 10000)

    it('orders by time', async () => {
      store.dispatch('generateHorses')
      store.dispatch('generateProgram')

      await store.dispatch('startRace')

      const completedRounds = store.getters.getCompletedRounds
      const results = completedRounds[0].results

      for (let i = 1; i < results.length; i++) {
        expect(results[i].time).toBeGreaterThanOrEqual(results[i - 1].time)
      }
    }, 10000)
  })

  describe('Round Navigation', () => {
    it('starts at round', () => {
      store.dispatch('generateHorses')
      store.dispatch('generateProgram')

      expect(store.getters.getCurrentRoundIndex).toBe(0)
    })

    it('moves next round', () => {
      store.dispatch('generateHorses')
      store.dispatch('generateProgram')

      store.dispatch('nextRound')

      expect(store.getters.getCurrentRoundIndex).toBe(1)
    })

    it('stays within rounds', () => {
      store.dispatch('generateHorses')
      store.dispatch('generateProgram')

      for (let i = 0; i < 10; i++) {
        store.dispatch('nextRound')
      }

      expect(store.getters.getCurrentRoundIndex).toBeLessThan(6)
    })
  })
})
