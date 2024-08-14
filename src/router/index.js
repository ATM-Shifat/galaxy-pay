import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '@/store/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: "/:catchAll(.*)",
      name:"notFound",
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

export default router
