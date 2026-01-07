<template>
  <div class="horse-list">
    <div class="horse-list-header">
      <h2>Horse List (1-20)</h2>
    </div>

    <div class="horse-list-content">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="horse in horses" :key="horse.id">
            <td>{{ horse.horse_name }}</td>
            <td class="name">
              <div class="condition-value-box">{{ horse.horse_condition }}</div>
            </td>
            <td>
              <div
                class="color-box"
                :style="{ backgroundColor: horse.horse_color }"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const horses = computed(() => store.getters.getAllHorses)

</script>

<style scoped>
.horse-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.horse-list-header {
  background-color: #f8b739;
  padding: 15px;
  text-align: center;
}

.horse-list-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.horse-list-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #ecf0f1;
  padding: 10px 5px;
  text-align: left;
  font-size: 0.9rem;
font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 1;
}

td {
  padding: 8px 5px;
  border-bottom: 1px solid #ecf0f1;
  font-size: 0.85rem;
}

.color-box {
  width: 30px;
  height: 30px;
  margin: 0 auto;
}
</style>
