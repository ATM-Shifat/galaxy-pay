<script setup>

import { computed, onMounted} from 'vue';
import { useAdminStore } from '@/admin/store'

import UserCard from '@/admin/components/UserCard.vue';

const adminStore = useAdminStore()


const users = computed(() => adminStore.users)


onMounted(async() => {
    await adminStore.adminGetUsers()
})
</script>

<template>

    <div class="users-container">
        <UserCard  v-for="user in users" :key="user.id" :user="user"/>
    </div>

</template>

<style scoped>

.users-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 50px auto;
    max-width: 90%;
}

</style>