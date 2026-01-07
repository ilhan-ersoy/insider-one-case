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
            <span class="result-round">{{ round.roundNumber }}ST Lap - {{ round.distance }}m </span>
          </div>

          <div class="round-horses-container">
            <div class="horses-header">
              <span>Position</span>
              <span>Name</span>
              <span>Color</span>
            </div>
            <div
              v-for="result in round.results"
              :key="result.horse.id"
              class="single-horse"
            >
              <span class="horse-position">{{ result.position }}</span>
              <span class="horse-name-chip">{{ result.horse.horse_name }}</span>
              <div class="horse-color-box" :style="{ backgroundColor: result.horse.horse_color }"></div>
            </div>
          </div>
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
  font-size: 19px;
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
  gap: 12px;
}

.result-section {
  border: 1px solid black;
  padding: 10px;
}

.result-header {
  margin-bottom: 10px;
}

.result-round {
  font-weight: bold;
  color: #2c3e50;
  font-size: 16px;
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

.horse-color-box {
  width: 30px;
  height: 20px;
}

@media (max-width: 768px) {
  .results-header h2 {
    font-size: 16px;
  }

  .results-content {
    padding: 12px;
  }

  .result-round {
    font-size: 14px;
  }

  .horses-header,
  .single-horse {
    grid-template-columns: 50px 1fr 50px;
    font-size: 12px;
  }

  .horse-color-box {
    width: 25px;
    height: 18px;
  }
}

@media (max-width: 480px) {
  .results-header {
    padding: 12px;
  }

  .results-header h2 {
    font-size: 14px;
  }

  .results-content {
    padding: 10px;
  }

  .result-section {
    padding: 8px;
  }

  .result-round {
    font-size: 14px;
  }

  .horses-header,
  .single-horse {
    grid-template-columns: 40px 1fr 40px;
    font-size: 11px;
    gap: 5px;
  }

  .horse-color-box {
    width: 20px;
    height: 15px;
  }
}
</style>
