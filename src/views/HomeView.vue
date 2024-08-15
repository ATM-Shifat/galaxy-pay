<script setup>

import Hero from "@/components/Hero.vue"
import { useStore } from "@/store/store"
import Transaction from "@/components/Transaction.vue";

const store = useStore()


const userLoggedIn = store.isAuthenticated


</script>

<template>
  <Hero v-if="!userLoggedIn"/>
  <Transaction v-else/>
</template>
