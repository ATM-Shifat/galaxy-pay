import { createRouter, createWebHistory } from 'vue-router'
import { galaxyStore} from '@/store'
import { useAdminStore } from '@/admin/store'

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
      path: "/admin/",
      name: "admin-home",
      component: () => import("@/admin/views/AdminHomeView.vue"),
      meta: { requiresAdmin: true }
    },
    {
      path: "/admin/login",
      name: "admin-login",
      component: () => import("@/admin/views/AdminLoginView.vue"),
      meta: { adminGuest: true }
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: () => import('@/views/NotFoundView.vue'),
      meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
  const adminStore = useAdminStore()

  if(to.meta.requiresAdmin &&!adminStore.isAdmin){
    next('/admin/login')
    return 
  }else if( to.meta.adminGuest && adminStore.isAdmin){
    next('/admin/')
    return
  }
  else
    next()
})



export default router
