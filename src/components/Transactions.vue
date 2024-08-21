<script setup>
import { reactive, computed, onMounted} from 'vue'
import { galaxyStore } from '@/store'
import Transaction from '@/components/Transaction.vue'
import { useRouter } from 'vue-router'

const userStore = galaxyStore()
const router = useRouter()

const transactions = computed(() => userStore.stateUser.transactions)


onMounted(async () => {
  try{
        await userStore.getProfile()
    }catch(error){
        console.error('Failed to fetch user profile', error)
        userStore.logOut()
        router.push('/')
    }
})

</script>

<template>
    <div class="transactions-container" >
      <div v-if="transactions.length">
        <Transaction v-for="transaction in transactions" :key="transaction.id" :transaction="transaction"/>
      </div>
      <div class="failed-text" v-else>
        No transaction found
      </div>
    </div>
</template>

<style scoped>

.transactions-container{
    display: flex;
    justify-content: center;
    max-width: 68vw;
    margin: 50px auto;
}


.failed-text{
  display: flex;
  color: var(--primary-color);
  justify-content: center;
}

</style>