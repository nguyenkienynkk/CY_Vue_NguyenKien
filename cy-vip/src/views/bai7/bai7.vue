<template>
  <form @submit.prevent="handleSubmit">
    <h2>Register</h2>

    <label>
      Name:
      <input type="text" v-model="form.name" required />
    </label>

    <label>
      Email:
      <input type="email" v-model="form.email" required />
    </label>

    <label>
      Phone Number:
      <input type="number" v-model="form.phoneNumber" required />
    </label>

    <label>
      Password:
      <input type="password" v-model="form.password" required />
    </label>

    <label>
      Confirm Password:
      <input type="password" v-model="form.confirmPassword" required />
    </label>

    <button
      type="submit"
      :class="{'btn-disabled': !isFormValid, 'btn-enabled': isFormValid}"
      :disabled="!isFormValid"
    >
      Đăng ký
    </button>

    <p v-if="isFormComplete">Form đã hoàn tất</p>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue';

const form = reactive({
  name: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
});

const isPasswordValid = computed(() => form.password.length >= 8);
const isFormValid = computed(() => {
  return (
    form.name &&
    form.email &&
    form.phoneNumber &&
    isPasswordValid.value &&
    form.password === form.confirmPassword
  );
});

const isFormComplete = computed(() => {
  return (
    form.name !== '' &&
    form.email !== '' &&
    form.phoneNumber !== '' &&
    form.password !== '' &&
    form.confirmPassword !== ''
  );
});

const handleSubmit = () => {
  if (isFormValid.value) {
    alert("Registration successful!");
  }
};

watch(
  () => form,
  (newVal) => {
    console.log("Form updated:", newVal);
  },
  { deep: true }
);
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

label {
  margin-bottom: 10px;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="number"],
input[type="password"] {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #4CAF50;
  outline: none;
}

button {
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-disabled {
  background-color: gray;
  color: white;
  cursor: not-allowed;
}
label,h2 {
  color: #181818;
}
.btn-enabled {
  background-color: #4CAF50;
  color: white;
}

p {
  color: green;
  font-weight: bold;
  margin-top: 10px;
}

@media (max-width: 400px) {
  form {
    max-width: 90%;
  }
}
</style>
