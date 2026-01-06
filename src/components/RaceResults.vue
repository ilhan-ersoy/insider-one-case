<template>
  <div class="race-results">
    <div class="results-header">
      <h2>Results</h2>
    </div>

    <div class="results-content">
      <div v-if="completedRounds.length === 0" class="no-results">
        <p>no results yet</p>
      </div>

      <div v-else class="results-list">
        <div
          v-for="round in completedRounds"
          :key="round.roundNumber"
          class="result-section"
        >
          <div class="result-header">
            <span class="result-round">{{ round.roundNumber }}ST Lap</span>-
            <span class="result-distance">{{ round.distance }}m</span>
          </div>

          <table class="result-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="result in round.results"
                :key="result.horse.id"
                :class="getPositionClass(result.position)"
              >
                <td class="position-cell">
                  <span class="position-badge">{{ result.position }}</span>
                </td>
                <td class="horse-info">
                  <div class="horse-color" :style="{ backgroundColor: result.horse.horse_color }"></div>
                  <span class="horse-name-result">{{ result.horse.horse_name }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const completedRounds = computed(() => store.getters.getCompletedRounds)

const getPositionClass = (position: number) => {
  if (position === 1) return 'first-place'
  if (position === 2) return 'second-place'
  if (position === 3) return 'third-place'
  return ''
}
</script>

<style scoped>
.race-results {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
  border-radius: 10px;
}

.results-header {
  background-color: #e74c3c;
  padding: 15px;
  text-align: center;
}

.results-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: white;
}

.results-content {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

.no-results {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #95a5a6;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-section {
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  overflow: hidden;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-header {
  color: #000;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-round {
  font-weight: bold;
  font-size: 1rem;
}

.result-distance {
  background-color: #e74c3c;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
}

.result-table {
  width: 100%;
  border-collapse: collapse;
}

.result-table thead {
  background-color: #ecf0f1;
}

.result-table th {
  padding: 10px;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 600;
  color: #2c3e50;
}

.result-table td {
  padding: 10px;
  border-bottom: 1px solid #ecf0f1;
  font-size: 0.85rem;
}

.position-cell {
  width: 80px;
}

.position-badge {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: #95a5a6;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  font-weight: bold;
}

.first-place .position-badge {
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #2c3e50;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.5);
}

.second-place .position-badge {
  background: linear-gradient(135deg, #c0c0c0, #e8e8e8);
  color: #2c3e50;
  box-shadow: 0 2px 8px rgba(192, 192, 192, 0.5);
}

.third-place .position-badge {
  background: linear-gradient(135deg, #cd7f32, #e8a87c);
  color: white;
  box-shadow: 0 2px 8px rgba(205, 127, 50, 0.5);
}

.horse-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.horse-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ecf0f1;
}

.horse-name-result {
  font-weight: 600;
  color: #2c3e50;
}

.first-place {
  background-color: #fff9e6;
}

.second-place {
  background-color: #f8f9fa;
}

.third-place {
  background-color: #fef5e7;
}
</style>
