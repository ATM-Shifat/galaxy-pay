<script setup>
import { RouterLink, useRouter, useRoute} from "vue-router"
import { galaxyStore } from "@/store"
import {computed } from 'vue'
import { useToast } from "vue-toastification";

const userStore = galaxyStore()
const router = useRouter()
const route = useRoute()
const toast = useToast()

const userLoggedIn = computed(() => userStore.isAuthenticated)

const user = computed( () => userStore.stateUser)

const logOut = () => {
    userStore.logOut()
    router.push('/')
    toast.success("Logged out successfully")
 }

const isActive = (path) => {
    return route.path === path
}

</script>

<template>
    <nav class="navbar">
        <span class="items">
            <RouterLink class="logo" to="/">
                <img class="logo-img" src="/wallet.ico" alt="Logo">
                <span class="logo-text">GalaxyPay</span>
            </RouterLink>

            <RouterLink class="nav-item" :class="{active : isActive('/')}" to="/">Home</RouterLink>
            <RouterLink class="nav-item" :class="{active : isActive('/accounts/transfer')}" to="/accounts/transfer">Transfer</RouterLink>
        </span>

        <span class="items">
            <span v-if="userLoggedIn">
                <RouterLink class="nav-item" :class="{active : isActive('/accounts/profile')}" to="/accounts/profile">{{user.name}}</RouterLink>
                <RouterLink class="nav-item" to="/" @click="logOut">Logout</RouterLink>
            </span>
            <span v-else>
                <RouterLink class="nav-item" :class="{active : isActive('/accounts/signup')}" to="/accounts/signup">Signup</RouterLink>
                <RouterLink class="nav-item" :class="{active : isActive('/accounts/login')}" to="/accounts/login">Login</RouterLink>
            </span>
        </span>
    </nav>
</template>

<style scoped>

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px; 
    background-color: var(--primary-color);
    box-shadow: 0px 5px 5px rgb(206, 201, 201);
}

.nav-item {
    padding: 4px 10px;
    color: #ffffff;
    font-weight: 500;
    margin: 0px 2px;
}

.nav-item:hover {
    background-color: var(--hover-color);
    border-radius: 5px;
    transition:  0.3s ease; 
}

.nav-item.active{
    background-color: var(--hover-color);
    border-bottom: 1px solid #fff;
    border-radius: 5px;
    transition:  0.3s ease; 

}

.logo {
    display: flex;
    align-items: center;
    margin-right:10px;
    text-decoration: none;
    padding: 4px 10px;
    color: #ffffff;
    font-weight: 500;
}

.logo-img {
    width: 2.5rem;
    /* margin:0 5px; */
}

.logo-text {
    font-weight: bold;
    font-size: 1.5rem;
}

.items{
    display:flex;
    align-items: center;
}

</style>
