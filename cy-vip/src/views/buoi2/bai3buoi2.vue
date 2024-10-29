<template>
  <div>
    <div class="product-grid">
      <div class="product-card" v-for="(item, index) in data.products" :key="index">
        <img :src="item.image" alt="Product Image" class="product-image" />
        <div class="product-info">
          <h3>{{ item.name }}</h3>
          <p>Price: {{ item.price }} VND</p>
          <p>Public Date: {{ item.publicDate }}</p>
          <p>Hot: {{ item.hot ? 'Yes' : 'No' }}</p>
          <p v-if="item.price > 4000">Đắt</p>
          <p v-else>Rẻ</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const data = reactive({
  cart: [],
  products: [
    {
      id: 1,
      name: 'PS5',
      price: 5555,
      publicDate: '05-05-2021',
      image: 'https://cdn.vjshop.vn/hightech/may-choi-game/ps5/sony-ps-5-1.jpg',
      hot: true,
    },
    {
      id: 2,
      name: 'PS4',
      price: 4444,
      publicDate: '04-04-2021',
      image:
        'https://gmedia.playstation.com/is/image/SIEPDC/ps4-slim-image-block-01-en-24jul20?$native--t$',
      hot: true,
    },
    {
      id: 3,
      name: 'PS3',
      price: 3333,
      publicDate: '03-03-2021',
      image:
        'https://images2.thanhnien.vn/528068263637045248/2024/1/25/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912.jpg',
      hot: false,
    },
  ],
  paymentMethods: [
    { text: 'COD', value: 1 },
    { text: 'Banking', value: 2 },
    { text: 'Ứng dụng bên thứ 3', value: 3 },
  ],
  selectedPayment: 2,
})
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.product-info h3 {
  font-size: 1.2em;
  margin: 10px 0;
}

.product-info p {
  margin: 5px 0;
}
</style>
