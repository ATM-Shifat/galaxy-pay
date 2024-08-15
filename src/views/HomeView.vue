<script setup>

import Hero from "@/components/Hero.vue"
import { useStore } from "@/store/store"

const store = useStore()


const userLoggedIn = !store.isAuthenticated


</script>

<template>
  <Hero v-if="userLoggedIn"/>
</template>
