<template>
  <div class="race-track">
    <div v-if="!currentRound" class="no-race">
      <p>click Generate PROGRAM</p>
    </div>

    <div v-else class="track-container">
      <div class="track-info">
        <h3>{{ currentRound.roundNumber }}st Lap {{ currentRound.distance }}m</h3>
      </div>

      <div class="track-lanes">
        <div
          v-for="(horse, index) in currentRound.horses"
          :key="horse.id"
          class="lane"
        >
          <div class="horse-lane-number-box">{{ (index as number) + 1 }}</div>

          <div class="road-area">
            <div class="horse-road">
            </div>

            <div
              class="horse-runner"
              :class="{ running: currentRound.status === 'running' }"
              :style="{
                animationDuration: getAnimationDuration(horse) + 's',
                animationDelay: '0s'
              }"
            >
              <div class="horse-icon">
                <HorseIcon :fill="horse.horse_color" width="48" height="48" />
              </div>
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
import type { Horse } from '@/types'
import HorseIcon from './HorseIcon.vue'

const store = useStore()

const currentRound = computed(() => store.getters.getCurrentRound)

const getAnimationDuration = (horse: Horse) => {
  const baseTime = 3
  const conditionFactor = (100 - horse.horse_condition) / 100
  const randomFactor = Math.random() * 0.3
  const time = baseTime + (baseTime * conditionFactor) + (randomFactor * 0.1)
  return time
}
</script>

<style scoped>
.race-track {
  height: 100%;
  display: block;
  width: 100%;
  flex-direction: column;
}

.no-race {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.5rem;
  color: #7f8c8d;
}

.track-container {
  padding: 20px;
  height: 100%;
  display: flex;
  width: 700px;
  flex-direction: column;
}

.track-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.track-info h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.3rem;
}

.track-lanes {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.lane {
  display: flex;
  align-items: center;
  min-height: 70px;
}

.horse-lane-number-box {
  display: flex;
  height: 100%;
  width: 40px;
  background-color: #5f7a45;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-bottom: 2px solid white;
}

.road-area {
  flex: 1;
  height: 70px;
  border: 2px solid #8b6f47;
  position: relative;
  overflow: hidden;
}

.horse-road {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.horse-runner {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.horse-runner.running {
  animation: run linear forwards;
}

@keyframes run {
  0% {
    left: 10px;
  }
  100% {
    left: calc(100% - 60px);
  }
}

.horse-icon {
  font-size: 48px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.horse-runner.running .horse-icon {
  animation: gallop 0.3s infinite;
}

@keyframes gallop {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-3px) rotate(-2deg);
  }
  75% {
    transform: translateY(3px) rotate(2deg);
  }
}
</style>
