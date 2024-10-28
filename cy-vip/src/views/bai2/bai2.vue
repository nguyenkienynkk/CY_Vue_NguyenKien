<template>
  <div>
    <input type="number" v-model="canh" />
    <button> {{ dientich}}</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const canh = ref(0)
const dientich = computed(() => {
  return canh.value * canh.value
})
</script>

<style scoped>
input[type="number"] {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  transition: border-color 0.3s;
}

input[type="number"]:focus {
  border-color: #4CAF50;
  outline: none;
}

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #45a049;
}

div {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.result {
  font-size: 18px;
  margin-top: 10px;
  color: #333;
}
</style>
