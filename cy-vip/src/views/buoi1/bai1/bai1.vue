<template>
  <div>
    <h1
      :class="{ 'in-stock': product.inStock, 'out-of-stock': !product.inStock }"
    >
      {{ product.product }}
    </h1>
    <img :src="product.image" :alt="product.imageAlt" />
    <p>Original: {{ product.price }}</p>
    <p>Product after updated: {{ pricePlusDiscount }}</p>
    <p>Description: {{ product.description }}</p>
    <p>Formatted Price: {{ formattedPrice }}</p>
    <button @click="changeDescription">Change Description</button>
    <input v-model="message" />
    <p>{{ message }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'

const products = ref([
  {
    image: 'https://cdn.vjshop.vn/hightech/may-choi-game/ps5/sony-ps-5-1.jpg',
    imageAlt: 'ps5 alt',
    product: 'ps5',
    productLink: 'https://bachtungps.com.vn/may-sony-playstation-5-ps5-1',
    quantity: 10,
    price: 10000,
    discount: 0.2,
    inStock: true,
    description: 'This is moo ta san pham',
    classObject: {
      'bg-green': true,
      'bg-blue': false,
    },
  },
])

const product = products.value[0]
const message = ref('Hello, World!');
const pricePlusDiscount = computed(() => {
  return product.price - (product.price * product.discount)
})

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(product.price)
})

const changeDescription = () => {
  product.description = 'Day la description moi hihihihihihihihihihihihihihihihihihihi'
}
</script>

<style scoped>
.in-stock {
  color: green;
  font-weight: bold;
}

.out-of-stock {
  color: red;
  font-weight: bold;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 10px 0;
}

p {
  margin: 5px 0;
}

p:nth-child(3),
p:nth-child(4) {
  font-size: 1.2em;
}

p:nth-child(4) {
  color: #ff0000;
  font-weight: bold;
}

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

input {
  padding: 10px;
  font-size: 14px;
  margin: 10px 0;
  border: 2px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.bg-green {
  background-color: green;
}

.bg-blue {
  background-color: blue;
}
</style>
