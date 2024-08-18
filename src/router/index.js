import { createRouter, createWebHistory } from 'vue-router'
import { galaxyStore} from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/accounts/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue')
    },
    {
      path: '/accounts/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: "/:catchAll(.*)",
      name:"notFound",
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

export default router
