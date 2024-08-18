<script setup>

import {computed } from 'vue'

import Hero from "@/components/Hero.vue"
import { galaxyStore} from "@/store"
import Transaction from "@/components/Transaction.vue";

const userStore = galaxyStore()


const userLoggedIn = computed(() => userStore.isAuthenticated)


</script>

<template>
  <Hero v-if="!userLoggedIn"/>
  <Transaction v-else/>
</template>
