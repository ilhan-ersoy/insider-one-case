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
  font-size: 18px;
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
  font-size: 14px;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 1;
}

td {
  padding: 8px 5px;
  border-bottom: 1px solid #ecf0f1;
  font-size: 13px;
}

.color-box {
  width: 30px;
  height: 30px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .horse-list-header h2 {
    font-size: 16px;
  }

  .horse-list-content {
    padding: 8px;
  }

  th {
    padding: 8px 4px;
    font-size: 13px;
  }

  td {
    padding: 6px 4px;
    font-size: 12px;
  }

  .color-box {
    width: 25px;
    height: 25px;
  }
}

@media (max-width: 480px) {
  .horse-list-header {
    padding: 12px;
  }

  .horse-list-header h2 {
    font-size: 14px;
  }

  .horse-list-content {
    padding: 6px;
  }

  th {
    padding: 6px 3px;
    font-size: 12px;
  }

  td {
    padding: 5px 3px;
    font-size: 11px;
  }

  .color-box {
    width: 20px;
    height: 20px;
  }
}
</style>
