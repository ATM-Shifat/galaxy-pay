import { createRouter, createWebHistory } from "vue-router";
import { useAdminStore } from "@/admin/store.js";

const adminRouter = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/admin/",
            name: "admin-home",
            component: () => import("./views/AdminHomeView.vue"),
            meta: { requiresAdmin: true }
        },
        {
            path: "/admin/login",
            name: "admin-login",
            component: () => import("./views/AdminLoginView.vue"),
            meta: { guest: true }
        },
    ]
})

adminRouter.beforeEach((to, from, next) => {
    const adminStore = useAdminStore()

    if (to.meta.requiresAdmin && !adminStore.isAdmin) {
        next("/admin/login")
        return
    } else if (to.meta.guest && adminStore.isAdmin){
        next("/admin/")
        return
    } else {
        next()
    }
})


export default adminRouter