<template>
  <div class="task-app">
    <h2>Today's Task</h2>
    <div class="task-header">
      <div class="tabs">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ active: currentTab === tab }"
          @click="currentTab = tab"
        >
          {{ tab }} ({{ getTaskCount(tab) }})
        </button>
      </div>
      <button @click="showAddModal = true" class="new-task-btn">
        + New Task
      </button>
    </div>

    <div class="task-list">
      <div v-for="task in filteredTasks" :key="task.id" class="task-item">
        <div class="task-details">
          <input
            type="checkbox"
            v-model="task.done"
            @change="saveTasksToLocalStorage"
          />
          <div class="task-info">
            <h3>{{ task.name }}</h3>
            <p>{{ task.startTime }} - {{ task.endTime }}</p>
          </div>
        </div>
        <button @click="editTask(task)" class="edit-btn">Edit</button>
        <button
          v-if="currentTab === 'Closed'"
          @click="deleteTask(task.id)"
          class="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>

    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <h3>{{ editingTask ? 'Edit Task' : 'Add New Task' }}</h3>
        <form @submit.prevent="editingTask ? updateTask() : addTask()">
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          <input
            type="text"
            v-model="newTask.name"
            placeholder="Task Name"
            required
          />
          <div class="time-inputs">
            <label for="startTime">Start Time:</label>
            <input
              id="startTime"
              type="time"
              v-model="newTask.startTime"
              required
            />
            <label for="endTime">End Time:</label>
            <input
              id="endTime"
              type="time"
              v-model="newTask.endTime"
              required
            />
          </div>
          <div class="modal-buttons">
            <button type="submit" class="primary-btn">
              {{ editingTask ? 'Update Task' : 'Add Task' }}
            </button>
            <button type="button" class="secondary-btn" @click="closeModal">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const tabs = ['All', 'Open', 'Closed']
const currentTab = ref('All')
const showAddModal = ref(false)
const editingTask = ref(false)
const tasks = ref([])

const newTask = ref({
  name: '',
  startTime: '',
  endTime: '',
  done: false,
})

onMounted(() => {
  const storedTasks = localStorage.getItem('tasks')
  if (storedTasks)
    tasks.value = JSON.parse(storedTasks)
})
const editTask = task => {
  editingTask.value = true
  newTask.value = { ...task }
  showAddModal.value = true
}
const updateTask = () => {
  if (newTask.value.startTime >= newTask.value.endTime) {
    errorMessage.value = 'End time must be greater than start time'
    return
  }
  const index = tasks.value.findIndex(task => task.id === newTask.value.id)
  if (index !== -1) {
    tasks.value[index] = newTask.value
  }
  closeModal()
  saveTasksToLocalStorage()
}

const saveTasksToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}
const errorMessage = ref('')
const closeModal = () => {
  showAddModal.value = false
  errorMessage.value = ''
}

const addTask = () => {
  if (newTask.value.startTime >= newTask.value.endTime) {
    errorMessage.value = 'End time must be greater than start time'
    return
  }
  tasks.value.push({
    ...newTask.value,
    id: tasks.value.length ? tasks.value[tasks.value.length - 1].id + 1 : 1,
  })
  newTask.value = {
    name: '',
    startTime: '',
    endTime: '',
    done: false,
  }
  errorMessage.value = ''
  showAddModal.value = false
  saveTasksToLocalStorage()
}

const getTaskCount = (tab: string) => {
  if (tab === 'All') return tasks.value.length
  return tasks.value.filter(
    task => (tab === 'Open' && !task.done) || (tab === 'Closed' && task.done),
  ).length
}

const filteredTasks = computed(() => {
  if (currentTab.value === 'All') return tasks.value
  if (currentTab.value === 'Open') return tasks.value.filter(task => !task.done)
  if (currentTab.value === 'Closed')
    return tasks.value.filter(task => task.done)
  return []
})
const deleteTask = (taskId: number) => {
  tasks.value = tasks.value.filter(task => task.id !== taskId)
  saveTasksToLocalStorage()
}
</script>

<style scoped>
.task-app {
  width: 400px;
  margin: auto;
  color: #e0e0e0;
  background-color: #1f1f1f;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
}

h2 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.tabs button {
  margin: 0 5px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #555;
  color: #e0e0e0;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.error-message {
  color: red;
  font-size: 14px;
  margin: 5px 0;
}

.tabs button.active,
.tabs button:hover {
  background-color: #555;
}

.new-task-btn {
  margin-top: 10px;
  margin-left: 30%;
  background-color: #6200ea;
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

input[type='checkbox'] {
  width: 20px;
  height: 20px;
  appearance: none;
  background-color: #333;
  border: 2px solid #555;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  transition: 0.3s;
}

input[type='checkbox']:hover {
  background-color: #444;
}

input[type='checkbox']:checked {
  background-color: #6200ea;
  border: 2px solid #6200ea;
}

input[type='checkbox']:checked::after {
  content: '✓';
  color: white;
  font-weight: bold;
  font-size: 14px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.new-task-btn:hover {
  background-color: #7b1fa2;
}

.task-list {
  margin-top: 15px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: #333;
  border-radius: 12px;
  margin-bottom: 10px;
}

.task-item:hover {
  transform: scale(1.1);
  transition: 0.3s all ease-in-out;
}

.task-details {
  display: flex;
}

.task-info {
  margin-left: 10px;
}

h3 {
  font-size: 18px;
  margin: 0;
}

p {
  margin: 3px 0;
  font-size: 14px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #2c2c2c;
  padding: 20px;
  border-radius: 12px;
  width: 300px;
  color: #e0e0e0;
}

input[type='time'],
input[type='text'] {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #555;
  background-color: #333;
  color: #e0e0e0;
}

.modal-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

.primary-btn,
.secondary-btn {
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.primary-btn {
  background-color: #6200ea;
  color: #fff;
  border: none;
}

.primary-btn:hover {
  background-color: #7b1fa2;
}

.secondary-btn {
  background-color: #555;
  color: #fff;
  border: none;
}

.secondary-btn:hover {
  background-color: #777;
}

.time-inputs {
  margin: 15px 0;
}

.delete-btn {
  background-color: #e53935;
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 10px;
}

.delete-btn:hover {
  background-color: #d32f2f;
}
</style>
