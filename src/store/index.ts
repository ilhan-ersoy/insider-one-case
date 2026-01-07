import { createStore, type ActionContext } from 'vuex'
import type { RaceState, Horse, Round, RaceResult, HorseInRound, RaceProgram } from '@/types'

const HORSE_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
  '#E74C3C', '#3498DB', '#9B59B6', '#1ABC9C', '#F39C12',
  '#E67E22', '#95A5A6', '#34495E', '#D35400', '#C0392B'
]

const HORSE_NAMES = [
  'Gürbatur', 'Şahbatur', 'Yıldırım', 'Alev', 'Gölge',
  'Rüzgar', 'Şampiyon', 'Zafer', 'Şan', 'Savaşçı',
  'Anka', 'Kaplan', 'Aslan', 'Şahin', 'Kartal',
  'Yiğit', 'Cesur', 'Hızır', 'Kral', 'Arslan'
]

const ROUND_DISTANCES: number[] = [1200, 1400, 1600, 1800, 2000, 2200]

export const store = createStore<RaceState>({
  state: {
    allHorses: [],
    program: null,
    currentRoundIndex: 0,
    isRacing: false,
    completedRounds: []
  },

  getters: {
    getAllHorses: (state: RaceState) => state.allHorses,

    getRaceProgram: (state: RaceState) => state.program,

    getCurrentRound: (state: RaceState) => {
      if (!state.program || state.currentRoundIndex >= state.program.rounds.length) {
        return null
      }
      return state.program.rounds[state.currentRoundIndex]
    },

    getCompletedRounds: (state: RaceState) => state.completedRounds,

    isRacing: (state: RaceState) => state.isRacing,

    getCurrentRoundIndex: (state: RaceState) => state.currentRoundIndex
  },

  mutations: {
    SET_HORSES(state: RaceState, horses: Horse[]) {
      state.allHorses = horses
    },

    SET_PROGRAM(state: RaceState, program: RaceProgram) {
      state.program = program
      state.currentRoundIndex = 0
      state.completedRounds = []
    },

    SET_CURRENT_ROUND_INDEX(state: RaceState, index: number) {
      state.currentRoundIndex = index
    },

    SET_IS_RACING(state: RaceState, isRacing: boolean) {
      state.isRacing = isRacing
    },

    SET_ROUND_STATUS(state: RaceState, { roundIndex, status }: { roundIndex: number; status: string }) {
      if (state.program && state.program.rounds[roundIndex]) {
        state.program.rounds[roundIndex].status = status as 'pending' | 'running' | 'completed'
      }
    },

    SET_ROUND_RESULTS(state: RaceState, { roundIndex, results }: { roundIndex: number; results: RaceResult[] }) {
      if (state.program && state.program.rounds[roundIndex]) {
        state.program.rounds[roundIndex].results = results
        state.completedRounds.push(state.program.rounds[roundIndex])
      }
    },

    RESET_RACE(state: RaceState) {
      state.program = null
      state.currentRoundIndex = 0
      state.isRacing = false
      state.completedRounds = []
    }
  },

  actions: {
    generateHorses({ commit }: ActionContext<RaceState, RaceState>) {
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

    generateProgram({ commit, state }: ActionContext<RaceState, RaceState>) {
      const rounds: Round[] = []

      for (let i = 0; i < 6; i++) {
        const selectedHorses = selectRandomHorses(state.allHorses, 10)
        const horsesWithLanes: HorseInRound[] = selectedHorses.map((horse, index) => ({
          ...horse,
          lane: index + 1
        }))

        rounds.push({
          roundNumber: i + 1,
          distance: ROUND_DISTANCES[i]!,
          horses: horsesWithLanes,
          status: 'pending'
        })
      }

      commit('SET_PROGRAM', { rounds })
    },

    async startRace({ commit, state, dispatch }: ActionContext<RaceState, RaceState>) {
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

    async simulateRace({ commit, state }: ActionContext<RaceState, RaceState>, roundIndex: number) {
      const round = state.program?.rounds[roundIndex]
      if (!round) return

      const results: RaceResult[] = []
      let maxTime = 0

      for (const horse of round.horses) {
        const baseTime = 3
        const conditionFactor = (100 - horse.horse_condition) / 100
        const randomFactor = Math.random() * 0.3
        const time = baseTime + (baseTime * conditionFactor) + (randomFactor * 0.1)

        if (time > maxTime) {
          maxTime = time
        }

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

      await new Promise(resolve => setTimeout(resolve, maxTime * 1000))

      commit('SET_ROUND_RESULTS', { roundIndex, results })
      commit('SET_ROUND_STATUS', { roundIndex, status: 'completed' })
      commit('SET_IS_RACING', false)
    },

    nextRound({ commit, state }: ActionContext<RaceState, RaceState>) {
      if (state.program && state.currentRoundIndex < state.program.rounds.length - 1) {
        commit('SET_CURRENT_ROUND_INDEX', state.currentRoundIndex + 1)
      }
    },

    resetRace({ commit }: ActionContext<RaceState, RaceState>) {
      commit('RESET_RACE')
    }
  }
})

function selectRandomHorses(horses: Horse[], count: number): Horse[] {
  const result = [...horses].sort(() => Math.random() - 0.5)
  return result.slice(0, count)
}

export default store
