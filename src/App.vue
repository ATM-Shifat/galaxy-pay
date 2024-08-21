<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

import { useRoute } from 'vue-router';
import { computed } from 'vue';
import NavBarAdmin from '@/admin/components/NavBarAdmin.vue';

const route = useRoute()

const adminNav = computed(() => route.path.includes('/admin'))

</script>

<template>
  <NavBarAdmin v-if="adminNav"/>
  <NavBar v-else/>
  <RouterView />
</template>