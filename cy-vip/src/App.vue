<template>
  <div class="nav-container">
<!--    <RouterLink class="nav-link" :to="{name: 'Bai-1'}">Bài 1</RouterLink>-->
<!--    <RouterLink class="nav-link" :to="{name: 'Bai-2'}">Bài 2</RouterLink>-->
<!--    <RouterLink class="nav-link" :to="{name: 'Bai-3'}">Bài 3</RouterLink>-->
<!--    <RouterLink class="nav-link" :to="{name: 'Bai-4'}">Bài 4</RouterLink>-->
<!--    <RouterLink class="nav-link" :to="{name: 'Bai-5'}">Bài 5</RouterLink>-->
<!--    <RouterLink class="nav-link" :to="{name: 'Bai-6'}">Bài 6</RouterLink>-->
<!--    <RouterLink class="nav-link" :to="{name: 'Bai-7'}">Bài 7</RouterLink>-->
    <RouterLink class="nav-link" :to="{name: 'Bai-1-Buoi-2'}">Bài 1 Buổi 2</RouterLink>
    <RouterLink class="nav-link" :to="{name: 'Bai-2-Buoi-2'}">Bài 2 Buổi 2</RouterLink>
    <RouterLink class="nav-link" :to="{name: 'Bai-3-Buoi-2'}">Bài 3 Buổi 2</RouterLink>
    <RouterLink class="nav-link" :to="{name: 'Bai-4-Buoi-2'}">Bài 4 Buổi 2</RouterLink>
    <RouterLink class="nav-link" :to="{name: 'Bai-5-Buoi-2'}">Bài 5 Buổi 2</RouterLink>
    <RouterLink class="nav-link" :to="{name: 'todo_app'}">Todo App</RouterLink>
  </div>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
</script>

<style scoped>
.nav-container {
  margin: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  padding: 10px 15px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #007bff;
  color: white;
}
</style>
