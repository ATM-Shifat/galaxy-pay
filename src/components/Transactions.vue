<script setup>
import { reactive, computed, onMounted} from 'vue'
import { galaxyStore } from '@/store'
import Transaction from '@/components/Transaction.vue'

const userStore = galaxyStore()

const transactions = computed(() => userStore.stateTransactions)


onMounted(async() => {
  await userStore.getTransactions()
})


</script>

<template>
    <div class="transactions-container" >
      <div v-if="transactions">
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
    max-width: 70vw;
    margin: 20px auto;
}


.failed-text{
  display: flex;
  color: var(--primary-color);
  justify-content: center;
}

</style>