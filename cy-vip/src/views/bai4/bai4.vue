<template>
  <div>
    <input type="number" v-model="numberOne" />
    <input type="number" v-model="numberTwo" />
    <p>
      Sum: {{ sum }}
      <br />
      Hiệu: {{ difference }}
      <br />
      Tích: {{ product }}
      <br />
      Thương: {{ quotient }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const numberOne = ref(0)
const numberTwo = ref(0)
const sum = ref(0)
const difference = ref(0)
const product = ref(0)
const quotient = ref(0)
watch([numberOne, numberTwo], ([setNumberOne, setNumberTwo]) => {
  sum.value = setNumberOne + setNumberTwo
  difference.value = setNumberOne - setNumberTwo
  product.value = setNumberOne * setNumberTwo
  if (setNumberTwo !== 0) {
    quotient.value = setNumberOne / setNumberTwo
  } else {
    quotient.value = 'Không thể chia cho 0'
  }
})
</script>

<style scoped>
input[type="number"] {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  width: calc(50% - 10px);
  box-sizing: border-box;
  margin: 5px;
  transition: border-color 0.3s;
}

input[type="number"]:focus {
  border-color: #4CAF50;
  outline: none;
}

p {
  font-size: 18px;
  color: #333;
  margin-top: 15px;
}

p br {
  margin: 5px 0;
}

div {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
