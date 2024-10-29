<template>
  <div>
    <input type="number" v-model="size" />
    <div v-bind:style="{ fontSize: size + 'px' }">Hello Welcome to Cy Viet Nam</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const size = ref(30)
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

div {
  padding: 10px;
  color: #333;
  transition: font-size 0.3s ease;
}

@media (max-width: 600px) {
  div {
    font-size: 20px;
  }
}
</style>
