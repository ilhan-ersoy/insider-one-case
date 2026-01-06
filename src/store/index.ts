import { createStore } from 'vuex'
import type { RaceState, Horse, Round, RaceResult, HorseInRound } from '@/types'

const HORSE_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
  '#E74C3C', '#3498DB', '#9B59B6', '#1ABC9C', '#F39C12',
  '#E67E22', '#95A5A6', '#34495E', '#D35400', '#C0392B'
]

const HORSE_NAMES = [
  'Gürbatur', 'Şahbatur', 'Storm', 'Blaze', 'Shadow',
  'Spirit', 'Champion', 'Victory', 'Glory', 'Warrior',
  'Phoenix', 'Titan', 'Atlas', 'Zeus', 'Apollo',
  'Hercules', 'Neptune', 'Mercury', 'Jupiter', 'Mars'
]

const ROUND_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200]

export const store = createStore<RaceState>({
  state: {
    allHorses: [],
    program: null,
    currentRoundIndex: 0,
    isRacing: false,
    completedRounds: []
  },

  getters: {
    getAllHorses: (state) => state.allHorses,

    getRaceProgram: (state) => state.program,

    getCurrentRound: (state) => {
      if (!state.program || state.currentRoundIndex >= state.program.rounds.length) {
        return null
      }
      return state.program.rounds[state.currentRoundIndex]
    },

    getCompletedRounds: (state) => state.completedRounds,

    isRacing: (state) => state.isRacing,

    getCurrentRoundIndex: (state) => state.currentRoundIndex
  },

  mutations: {
    SET_HORSES(state, horses: Horse[]) {
      state.allHorses = horses
    },

    SET_PROGRAM(state, program) {
      state.program = program
      state.currentRoundIndex = 0
      state.completedRounds = []
    },

    SET_CURRENT_ROUND_INDEX(state, index: number) {
      state.currentRoundIndex = index
    },

    SET_IS_RACING(state, isRacing: boolean) {
      state.isRacing = isRacing
    },

    SET_ROUND_STATUS(state, { roundIndex, status }: { roundIndex: number; status: string }) {
      if (state.program && state.program.rounds[roundIndex]) {
        state.program.rounds[roundIndex].status = status as 'pending' | 'running' | 'completed'
      }
    },

    SET_ROUND_RESULTS(state, { roundIndex, results }: { roundIndex: number; results: RaceResult[] }) {
      if (state.program && state.program.rounds[roundIndex]) {
        state.program.rounds[roundIndex].results = results
        state.completedRounds.push(state.program.rounds[roundIndex])
      }
    },

    RESET_RACE(state) {
      state.program = null
      state.currentRoundIndex = 0
      state.isRacing = false
      state.completedRounds = []
    }
  },

  actions: {
    generateHorses({ commit }) {
      const horses: Horse[] = []

      for (let i = 0; i < 20; i++) {
        horses.push({
          id: i + 1,
          horse_name: HORSE_NAMES[i] || `Horse ${i + 1}`,
          horse_condition: Math.floor(Math.random() * 100) + 1,
          horse_color: HORSE_COLORS[i] || '#000000'
        })
      }

      commit('SET_HORSES', horses)
    },

    generateProgram({ commit, state }) {
      const rounds: Round[] = []

      for (let i = 0; i < 6; i++) {
        const selectedHorses = selectRandomHorses(state.allHorses, 10)
        const horsesWithLanes: HorseInRound[] = selectedHorses.map((horse, index) => ({
          ...horse,
          lane: index + 1
        }))

        rounds.push({
          roundNumber: i + 1,
          distance: ROUND_DISTANCES[i],
          horses: horsesWithLanes,
          status: 'pending'
        })
      }

      commit('SET_PROGRAM', { rounds })
    },

    async startRace({ commit, state, dispatch }) {
      if (!state.program) {
        throw new Error('No program generated. Generate program first.')
      }

      if (state.currentRoundIndex >= state.program.rounds.length) {
        throw new Error('All rounds completed.')
      }

      commit('SET_IS_RACING', true)
      commit('SET_ROUND_STATUS', {
        roundIndex: state.currentRoundIndex,
        status: 'running'
      })

      await dispatch('simulateRace', state.currentRoundIndex)
    },

    async simulateRace({ commit, state }, roundIndex: number) {
      const round = state.program?.rounds[roundIndex]
      if (!round) return

      const results: RaceResult[] = []

      for (const horse of round.horses) {
        const baseTime = round.distance / 10
        const conditionFactor = (100 - horse.horse_condition) / 100
        const randomFactor = Math.random() * 2
        const time = baseTime + (baseTime * conditionFactor) + randomFactor

        results.push({
          position: 0,
          horse,
          time
        })
      }

      results.sort((a, b) => a.time - b.time)
      results.forEach((result, index) => {
        result.position = index + 1
      })

      await new Promise(resolve => setTimeout(resolve, 3000))

      commit('SET_ROUND_RESULTS', { roundIndex, results })
      commit('SET_ROUND_STATUS', { roundIndex, status: 'completed' })
      commit('SET_IS_RACING', false)
    },

    nextRound({ commit, state }) {
      if (state.program && state.currentRoundIndex < state.program.rounds.length - 1) {
        commit('SET_CURRENT_ROUND_INDEX', state.currentRoundIndex + 1)
      }
    },

    resetRace({ commit }) {
      commit('RESET_RACE')
    }
  }
})

function selectRandomHorses(horses: Horse[], count: number): Horse[] {
  const result = [...horses].sort(() => Math.random() - 0.5)
  return result.slice(0, count)
}

export default store
