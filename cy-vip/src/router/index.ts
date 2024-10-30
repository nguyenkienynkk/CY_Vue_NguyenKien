import { createRouter, createWebHistory } from 'vue-router'
import Bai1 from '@/views/buoi1/bai1/bai1.vue'
import Bai2 from '@/views/buoi1/bai2/bai2.vue'
import Bai3 from '@/views/buoi1/bai3/bai3.vue'
import Bai4 from '@/views/buoi1/bai4/bai4.vue'
import Bai5 from '@/views/buoi1/bai5/bai5.vue'
import Bai6 from '@/views/buoi1/bai6/bai6.vue'
import Bai7 from '@/views/buoi1/bai7/bai7.vue'
import Bai1buoi2 from '@/views/buoi2/bai1buoi2.vue'
import Bai2buoi2 from '@/views/buoi2/bai2buoi2.vue'
import Bai3buoi2 from '@/views/buoi2/bai3buoi2.vue'
import Bai4buoi2 from '@/views/buoi2/bai4buoi2.vue'
import Bai5buoi2 from '@/views/buoi2/bai5buoi2.vue'
import Todo_app from '@/views/todo/todo_app.vue'
import Mini_project from '@/views/buoi3/mini_project.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/bai1',
      name: 'Bai-1',
      component: Bai1,
    },
    {
      path: '/bai2',
      name: 'Bai-2',
      component: Bai2,
    },
    {
      path: '/bai3',
      name: 'Bai-3',
      component: Bai3,
    },
    {
      path: '/bai4',
      name: 'Bai-4',
      component: Bai4,
    },
    {
      path: '/bai5',
      name: 'Bai-5',
      component: Bai5,
    },
    {
      path: '/bai6',
      name: 'Bai-6',
      component: Bai6,
    },
    {
      path: '/bai7',
      name: 'Bai-7',
      component: Bai7,
    },
    {
      path: '/buoi2/bai1',
      name: 'Bai-1-Buoi-2',
      component: Bai1buoi2,
    },
    {
      path: '/buoi2/bai2',
      name: 'Bai-2-Buoi-2',
      component: Bai2buoi2,
    },
    {
      path: '/buoi2/bai3',
      name: 'Bai-3-Buoi-2',
      component: Bai3buoi2,
    },
    {
      path: '/buoi2/bai4',
      name: 'Bai-4-Buoi-2',
      component: Bai4buoi2,
    },
    {
      path: '/buoi2/bai5',
      name: 'Bai-5-Buoi-2',
      component: Bai5buoi2,
    },
    {
      path: '/todo_app',
      name: 'todo_app',
      component: Todo_app,
    },
    {
      path: '/Bai-1-Buoi-3',
      name: 'Bai-1-Buoi-3',
      component: Mini_project,
    },
  ],
})

export default router
