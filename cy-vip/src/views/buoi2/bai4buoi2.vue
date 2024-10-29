<template>
  <div>
    <table border="1">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Public Date</th>
        <th>Image</th>
        <th>Hot</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in data.products" :key="index">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.publicDate }}</td>
        <td>
          <img
            :src="item.image"
            alt="Product Image"
            style="width: 100px; height: auto"
          />
        </td>
        <td>{{ item.hot ? 'Yes' : 'No' }}</td>
        <td>
          <span v-if="item.price > 4000">Đắt</span>
          <span v-else>Rẻ</span>
        </td>
        <td>
          <button @click="addToCart(item)">Thêm vào giỏ hàng</button>
        </td>
      </tr>
      </tbody>
    </table>

    <h2>Giỏ hàng</h2>
    <ul>
      <li v-for="(product, index) in data.cart" :key="index">
        {{ product.name }} - {{ product.price }} VND
      </li>
    </ul>
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

const addToCart = (product) => {
  data.cart.push(product)
  alert(`Đã thêm ${product.name} vào giỏ hàng!`)
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  color: #333;
  font-weight: bold;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #45a049;
}

img {
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.5em;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  padding: 8px;
  margin: 4px 0;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  color: #333;
  font-weight: bold;
  border-radius: 4px;
}

li:nth-child(even) {
  background-color: #f1f1f1;
}
*{
  color: white;
}
</style>

