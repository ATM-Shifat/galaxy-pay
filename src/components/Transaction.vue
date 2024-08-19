<script setup>

import {computed } from 'vue'

import { galaxyStore } from '@/store';

const userStore = galaxyStore()



const totalTransactions = computed(() =>  userStore.stateTransactions)

</script>

<template>
    <p>Balance: 0$</p>
    Transactions: {{   }}
</template>