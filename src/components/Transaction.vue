<script setup>

import { computed } from 'vue'
import { isoToUnixTime } from '@/utilities/utilities'

import { galaxyStore } from '@/store'

const userStore =  galaxyStore()

const myAccount = computed(() => userStore.stateUser.account)

defineProps({
  transaction : {
    type: Object,
    required: true,
  }
})

</script>

<template>
    <div v-if="transaction">
      <div class="transaction-container">
        <div class="transaction-item">
            Trnxid:
            <span class="number">{{ transaction.id }}</span>
        </div>
        <div class="transaction-item">
          Sender: <span class="number"> {{ transaction.from === myAccount ? "Self" : transaction.from }}</span>
        </div>
        <div class="transaction-item">
          Receiver: <span class="number"> {{ transaction.to === myAccount ? "Self" : transaction.to }}</span>
        </div>
        <div class="transaction-item">
          Amount:
          <span class="number">{{transaction.amount}}$</span>
        </div>
        <div class="transaction-item">
          TimeStamp: 
          <span class="number">{{isoToUnixTime(transaction.timestamp)}}</span>
          
        </div>
      </div>
    </div>
    
</template>

<style scoped>


.transaction-container{
  border-radius: 10px;
  box-shadow: 0 0 5px gray;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #fff;
  margin: 5px auto;
  padding: 15px 20px;
  color: gray;

}

.transaction-container:hover{
  box-shadow: 0 0 10px gray;
  transition:  0.3s ease; 
}

.transaction-item{
  margin: auto 10px;
}

.number{
  color: var(--secondary-color);
}


</style>