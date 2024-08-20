<script setup>

import {computed, onMounted, reactive} from 'vue'
import { galaxyStore } from '@/store';

const userStore = galaxyStore()

const myAcc = computed(() => userStore.stateUserAccount)

</script>

<template>

{{myAcc}}
</template>

<style scoped>

</style>