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
      </tr>
      </tbody>
    </table>

    <table border="1">
      <thead>
      <tr>
        <th>Name payment</th>
        <th>Payment value</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(payment,index) in data.paymentMethods" :key="index">
        <td>{{ payment.text }}</td>
        <td>{{ payment.value }}</td>
      </tr>
      </tbody>
    </table>
    <label for="paymentSelect">Select Payment Method:</label>
    <select id="paymentSelect" v-model="data.selectedPayment">
      <option v-for="(payment, index) in data.paymentMethods" :key="index" :value="payment.value">
        {{ payment.text }}
      </option>
    </select>
  </div>
</template>


<script setup lang="ts">
import { reactive, watch } from 'vue'

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

watch(() => data.selectedPayment, (newValue) => {
  const selectedPayment = data.paymentMethods.find(payment => payment.value === newValue)?.text || ''
  alert(`Payment method changed to: ${selectedPayment}`)
})
</script>


<style scoped>
div {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th {
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: left;
}

td {
  padding: 10px;
  border: 1px solid #ddd;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

img {
  width: 100px;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

label {
  font-size: 16px;
  margin-bottom: 10px;
  display: block;
}

select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  font-size: 16px;
  margin-bottom: 20px;
  transition: border-color 0.3s;
}

select:focus {
  border-color: #007bff;
  outline: none;
}
*{
  color: #181818;
}
</style>
