<template>
  <div>
    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox" :class="{ isChecked: checked, notChecked: !checked }"
      >This is checked</label
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>

<style scoped>
input[type="checkbox"] {
  cursor: pointer;
  margin-right: 10px;
}

label {
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.isChecked {
  color: green;
  font-weight: bold;
}

.notChecked {
  color: red;
  font-weight: normal;
}

div {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  max-width: 300px;
  margin: 20px auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

</style>
