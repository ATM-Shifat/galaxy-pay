<script setup>

import {computed } from 'vue'

import Hero from "@/components/Hero.vue"
import { galaxyStore} from "@/store"
import Transactions from "@/components/Transactions.vue";

const userStore = galaxyStore()


const userLoggedIn = computed(() => userStore.isAuthenticated)


</script>

<template>
  <Hero v-if="!userLoggedIn"/>
  <Transactions v-else/>
</template>
