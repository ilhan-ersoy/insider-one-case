<template>
  <div class="race-program">
    <div class="program-header">
      <h2>Program</h2>
    </div>

    <div class="program-content">
      <div v-if="program"  class="program-list">
        <div
          v-for="round in program.rounds"
          :key="round.roundNumber"
          class="program-item"
          :class="{
            active: currentRoundIndex === round.roundNumber - 1,
            completed: round.status === 'completed'
          }"
        >
          <div class="round-header">
            <span class="round-number"> {{ round.roundNumber }} ST Lap - {{ round.distance }}m</span>
          </div>

          <div class="round-horses-container">
            <div class="horses-header">
              <span>Position</span>
              <span>Name</span>
              <span>Color</span>
            </div>
            <div v-for="horse in round.horses" :key="horse.id" class="single-horse">
              <span class="horse-position">{{ horse.lane }}</span>
              <span class="horse-name-chip">{{ horse.horse_name }}</span>
              <div class="horse-color-box" :style="{ backgroundColor: horse.horse_color }"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-else="!program" class="no-program">
        <p>no program</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const program = computed(() => store.getters.getRaceProgram)
const currentRoundIndex = computed(() => store.getters.getCurrentRoundIndex)
</script>

<style scoped>
.race-program {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
  border-radius: 10px;
}

.program-header {
  background-color: #3498db;
  padding: 15px;
  text-align: center;
}

.program-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: white;
}

.program-content {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

.horse-color-box {
  width: 30px;
  height: 20px;
}

.no-program {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #95a5a6;
}

.program-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.program-item {
  border: 1px solid black;
  padding: 10px;
}

.program-item.active {
  border-color: #845a17;
  background-color: #fff9e6;
  box-shadow: 0 2px 8px rgba(243, 156, 18, 0.2);
  border-radius: 10px;
}

.program-item.completed {
  border-color: #2ecc71;
  background-color: #e8f8f5;
}

.round-header {
  margin-bottom: 10px;
}

.round-number {
  font-weight: bold;
  color: #2c3e50;
  font-size: 1rem;
}

.round-horses-container {
  display: flex;
  flex-direction: column;
}

.horses-header {
  display: grid;
  grid-template-columns: 60px 1fr 60px;
  gap: 10px;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  padding-bottom: 8px;
  border-bottom: 2px solid #ecf0f1;
  margin-bottom: 8px;
  color: #2c3e50;
}

.single-horse {
  display: grid;
  grid-template-columns: 60px 1fr 60px;
  gap: 10px;
  align-items: center;
  font-size: 14px;
  padding: 4px 0;
}

.horse-position {
  color: #7f8c8d;
  font-weight: 600;
  text-align: center;
}

.horse-name-chip {
  color: #34495e;
  font-weight: 500;
}
</style>
