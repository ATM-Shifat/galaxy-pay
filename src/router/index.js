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
      component: () => import('@/views/SignupView.vue'),
      meta: { guest: true }
    },
    {
      path: '/accounts/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { guest: true }
    },
    {
      path: '/accounts/transfer',
      name: 'transfer',
      component: () => import('@/views/TransferView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/accounts/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: "/:catchAll(.*)",
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        next('/')
      }
    }
  ]
})


router.beforeEach((to, from, next) => {
  const userStore = galaxyStore()

  if(to.meta.requiresAuth && !userStore.isAuthenticated){
    next('/accounts/login')
    return 
  }else
    next()

})


router.beforeEach((to, from, next) => {
  const userStore = galaxyStore()

  if(to.meta.guest && userStore.isAuthenticated){
    next('/')
    return 
  }else{
    next()
    return 
  }
    

})





export default router
