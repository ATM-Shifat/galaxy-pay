<script setup>

import {computed, onMounted, reactive} from 'vue'
import { galaxyStore } from '@/store';
import Transaction from '@/components/Transaction.vue';

const userStore = galaxyStore()

const user = computed(() => userStore.stateUser)
const transactions = computed(() => userStore.stateUser.transactions)

onMounted(async()=>{
    await userStore.getProfile()
})

</script>

<template>
    <div class="profile-container">
        <div class="profile-info-container">
            <div class="profile-item">
                Name: <span class="profile-info">{{user.name}}</span>
            </div>
            <div class="profile-item">
                Account No: <span class="profile-info"> {{ user.account }}</span>
            </div>
            <div class="profile-item">
            Balance: <span class="profile-info"> {{ user.balance }}$</span>
            </div>
            <div class="profile-item">
                Phone: <span class="profile-info"> {{ user.phone }} </span>
            </div>
            <div class="profile-item">
                Email: <span class="profile-info"> {{ user.email }} </span>
            </div>
        </div>
    
        <Transaction class="transactions-container" v-for="transaction in transactions" :key="transaction.id" :transaction="transaction"/>
    
    </div>
</template>

<style scoped>
.profile-container{
    padding: 5px 100px;
    margin: 20px;
    align-items: start;
}
.profile-info-container{
    margin: 0px auto;
    margin-top: 50px;
    margin-bottom: 10px;
    width: 68vw;
    border: 1px  solid #ddd;
    box-shadow: 0px 0px 5px gray;
    border-radius: 15px;
    padding: 20px;
}

.profile-info-container:hover{
    box-shadow: 0px 0px 10px gray;
    transition: 0.3 ease;
}

.transactions-container {
    margin: 0px auto;
    max-width: 72vw; /* Ensure content inside is left-aligned */
}


.profile-item{
    margin: 2px 0px;
    color: #858484;
}
.profile-info{
    color: var(--secondary-color);
    margin-left: 2px;
}

</style>