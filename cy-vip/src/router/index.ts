import { createRouter, createWebHistory } from 'vue-router'
import Bai1 from '@/views/bai1/bai1.vue'
import Bai2 from '@/views/bai2/bai2.vue'
import Bai3 from '@/views/bai3/bai3.vue'
import Bai4 from '@/views/bai4/bai4.vue'
import Bai5 from '@/views/bai5/bai5.vue'
import Bai6 from '@/views/bai6/bai6.vue'
import Bai7 from '@/views/bai7/bai7.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/bai1',
      name: 'Bai-1',
      component: Bai1
    },
    {
      path: '/bai2',
      name: 'Bai-2',
      component: Bai2
    },
    {
      path: '/bai3',
      name: 'Bai-3',
      component: Bai3
    },
    {
      path: '/bai4',
      name: 'Bai-4',
      component: Bai4
    },
    {
      path: '/bai5',
      name: 'Bai-5',
      component: Bai5
    },
    {
      path: '/bai6',
      name: 'Bai-6',
      component: Bai6
    },
    {
      path: '/bai7',
      name: 'Bai-7',
      component: Bai7
    },
  ]
})

export default router
