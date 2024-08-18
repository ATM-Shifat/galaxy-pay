<script setup>

import {computed } from 'vue'

import { galaxyStore } from '@/store';

const userStore = galaxyStore()



const totalTransactions = computed(() => {
  return userStore.stateTransactions;
})

</script>

<template>
    Transactions: {{  totalTransactions }}
</template>