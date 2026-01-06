export interface Horse {
  id: number
  horse_name: string
  horse_condition: number
  horse_color: string
}

export interface HorseInRound extends Horse {
  lane: number
}

export interface Round {
  roundNumber: number
  distance: number
  horses: HorseInRound[]
  results?: RaceResult[]
  status: 'pending' | 'running' | 'completed'
}

export interface RaceResult {
  position: number
  horse: Horse
  time: number
}

export interface RaceProgram {
  rounds: Round[]
}

export interface RaceState {
  allHorses: Horse[]
  program: RaceProgram | null
  currentRoundIndex: number
  isRacing: boolean
  completedRounds: Round[]
}
