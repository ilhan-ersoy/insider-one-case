<template>
  <div class="horse-racing">
    <div class="header">
      <h1>🏇🏼 Horse Racing 🏇🏼</h1>
      <div class="actions">
        <button @click="handleGenerateProgram" class="button generate">
          GENERATE PROGRAM
        </button>
        <button
          :disabled="!canStartRace || hasStarted"
          @click="handleStart"
          class="button start"
          :style="{ pointerEvents: hasStarted ? 'none' : 'auto' }"
        >
          {{ hasStarted ? 'STARTED' : 'START' }}
        </button>
      </div>
    </div>

    <div class="content">
      <div class="left-part">
        <HorseList />
      </div>

      <div class="middle-part">
        <RaceTrack />
      </div>

      <div class="right-part">
        <RaceProgram />
        <RaceResults />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import HorseList from '../HorseList/HorseList.vue'
import RaceTrack from '../RaceTrack/RaceTrack.vue'
import RaceProgram from '../RaceProgram/RaceProgram.vue'
import RaceResults from '../RaceResults/RaceResults.vue'

const store = useStore()

const isRacing = computed(() => store.getters.isRacing)
const program = computed(() => store.getters.getRaceProgram)
const currentRoundIndex = computed(() => store.getters.getCurrentRoundIndex)

const canStartRace = computed(() => {
  return program.value !== null && !isRacing.value && currentRoundIndex.value < 6
})

const hasStarted = ref(false)
const raceTimeout = ref<number | null>(null)

onMounted(() => {
  store.dispatch('generateHorses')
})

const handleGenerateProgram = () => {
  hasStarted.value = false
  store.dispatch('generateProgram')
}

const handleStart = async () => {
  if (!isRacing.value && !hasStarted.value) {
    hasStarted.value = true
    runNextRound()
  }
}

const runNextRound = async () => {
  if (currentRoundIndex.value >= 6) {
    return
  }

  await store.dispatch('startRace')

  raceTimeout.value = window.setTimeout(() => {
    const nextIndex = currentRoundIndex.value + 1

    if (nextIndex >= 6) {
      store.dispatch('nextRound')
      return
    }

    store.dispatch('nextRound')

    if (nextIndex < 6) {
      runNextRound()
    }
  }, 4000)
}

watch(currentRoundIndex, (newIndex) => {
  if (newIndex >= 6) {
    if (raceTimeout.value) {
      clearTimeout(raceTimeout.value)
    }
  }
})
</script>

<style scoped>
.horse-racing {
  width: 100%;
  margin: 0 auto;
  max-width: 1800px;

}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #000;
  gap: 20px;
  margin-top: 30px;
}

.header h1 {
  margin: 0;
  font-size: 32px;
}

.actions {
  display: flex;
  gap: 10px;
}

.button {
  padding: 12px 24px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button.generate {
  background-color: #e74c3c;
}

.button.start {
  background-color: #2ecc71;
}

.content {
  display: grid;
  grid-template-columns: 15% 40% 45%;
  gap: 10px;
  height: calc(100vh - 200px);
  padding: 30px;
}

.left-part,
.middle-part {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  height: 830px;
}

.right-part {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  gap: 20px;
}

@media (max-width: 1400px) {
  .content {
    grid-template-columns: 20% 80%;
    grid-template-rows: auto auto;
  }

  .left-part {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    height: auto;
    max-height: 400px;
  }

  .middle-part {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    height: auto;
    max-height: 400px;
  }

  .right-part {
    grid-column: 1 / 3;
    grid-row: 2 / 3;
    height: auto;
  }
}

@media (max-width: 1024px) {
  .content {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    height: auto;
    padding: 20px;
  }

  .header {
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }

  .header h1 {
    font-size: 24px;
  }

  .left-part,
  .middle-part,
  .right-part {
    grid-column: 1;
    height: auto;
    max-height: 500px;
  }

  .right-part {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .content {
    padding: 15px;
    gap: 15px;
  }

  .header {
    margin-top: 15px;
  }

  .header h1 {
    font-size: 19px;
  }

  .button {
    padding: 10px 20px;
    font-size: 12px;
  }

  .left-part,
  .middle-part,
  .right-part {
    max-height: 400px;
  }
}

@media (max-width: 480px) {
  .content {
    padding: 10px;
    gap: 10px;
  }

  .header {
    margin-top: 10px;
  }

  .header h1 {
    font-size: 16px;
  }

  .actions {
    flex-direction: column;
    width: 100%;
  }

  .button {
    width: 100%;
    padding: 12px;
  }

  .left-part,
  .middle-part,
  .right-part {
    max-height: 350px;
  }
}
</style>
