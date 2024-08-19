<script setup>

import {computed, onMounted, reactive, ref} from 'vue'
import {useToast} from 'vue-toastification'

import { galaxyStore } from '@/store';


const toast = useToast()
const userStore = galaxyStore()

const balance = ref(0)

const form = reactive({
    receiver: '',
    amount: ''
})

const fetchBalance = async () => {
    try{
        const response = await userStore.getBalance()

        if(response.status === 200 || response.status === 304){
            balance.value =  response.data.balance
        }
    }catch(error){
        console.error("Failed to get balance ",error)
        toast.error("Failed to get balance!")
    }
}

const submit = async() => {

    if(!form.receiver)
        return toast.error("Receiver can not be empty!")
    if(!form.amount)
        return toast.error("Amount can not be empty!")

    if(Number(form.amount) > Number(balance.value))
        return toast.error("Transfer amount can't be greater than balance")
    try{

        const response = await userStore.transferFunds({
           receiver: form.receiver, 
           amount: form.amount
        })

        if(response.status === 200){
            await fetchBalance()
            toast.success(response.data.message)
        }
            
    }catch(error){
        console.error("Fund transfer failed",error)
        if(error.response.data.error)
            toast.error(error.response.data.error)
    }
}


onMounted(async () => {
    await fetchBalance()
})

</script>

<template>
    <div class="form-container">
        <div class="form">
            <div class="title"> Transfer Fund</div>
            <div class="balance-container">
                Balance: {{balance}}$
            </div>
            <form class="input-container" @submit.prevent="submit">
                  
                <div class="input-container-div">
                    <label for="receiver">Receiver:</label>
                    <input name="receiver" type="text" v-model="form.receiver">
                </div>
                <div class="input-container-div">
                    <label for="amount">Amount:</label>
                    <input name="amount" type="number" step="0.1" v-model="form.amount">
                </div>
                <div class="button-container">
                    <button class="button" type="submit">Send</button>
                </div>
            </form>
        </div>
    </div>
</template>


<style scoped>

.balance-container{
    text-align: left;
    padding-left: 20px;
    margin-bottom: 10px;
    color: var(--primary-color);
    font-size: 1.1rem;
    font-weight: 500;
}

.balance{
    color: gray;
}

</style>