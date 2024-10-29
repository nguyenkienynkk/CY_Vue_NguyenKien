<template>
  <div>
    <h1>Tổng giá trị sản phẩm là: {{ totalProduct }}</h1>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

const product = reactive([
  {
    id: 1,
    name: 'Product 1',
    price: 100,
    quantity: 5,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200,
    quantity: 3,
  },
  {
    id: 3,
    name: 'Product 3',
    price: 300,
    quantity: 7,
  },
])
const totalProduct = computed(() => {
  debugger
  return product.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
})
</script>
<style scoped>
div {
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  color: #333;
  margin: 0;
}

@media (max-width: 600px) {
  h1 {
    font-size: 20px;
  }
}
</style>
