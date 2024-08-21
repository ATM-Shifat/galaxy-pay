<script setup>

import { defineProps, useAttrs } from 'vue';
import { useToast } from 'vue-toastification';
import { useAdminStore } from '../store';

const toast = useToast();
const adminStore = useAdminStore();

defineProps({
    user: {
        type: Object,
        required: true
    }
})


const deleteUser = async(id) => {
    try{
        const response = await adminStore.adminDeleteUser(id)

        if(response.status == 200){
            await adminStore.adminGetUsers()
            toast.success(response.data.message)
        }
            
    }catch(error){
        console.error("Error", error);
        if(error.response.data.error)
            toast.error(error.response.data.error)
        else
            toast.error("Failed to deleted user!")
    }
}

</script>

<template>
    <div>
      <div class="user-container">
        <div class="user-item">
            <p>Name:</p>
            <span class="number">{{ user.name }}</span>
        </div>
        <div class="user-item">
            <p>Account No:</p> 
            <span class="number"> {{ user.account }}</span>
        </div>
        <div class="user-item">
            <p>Balance: </p>
            <span class="number"> {{ user.balance }}</span>
        </div>
        <div class="user-item">
            <p>Transctions: </p>
            <span class="number"> {{ user.transactions.length }}</span>
        </div>
        <div class="user-item">
            <p>Phone: </p>
            <span class="number"> {{ user.phone }}</span>
        </div>
        <div class="user-item">
            <p>Email: </p>
            <span class="number"> {{ user.email }}</span>
        </div>
        <div class="user-item">
            <button class="delete-button" @click="deleteUser(user.id)">
                X
            </button>
        </div>
      </div>
    </div>
</template>

<style scoped>


.user-container{
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

.user-container:hover{
  box-shadow: 0 0 10px gray;
  transition:  0.3s ease; 
}

.user-item{
  margin: auto 10px;
}


.number{
  color: var(--secondary-color);
}


.delete-button{
    border: none;
    color: var(--hover-color);
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 700;
    background-color: white;;
}

.delete-button:hover{
    color: var(--primary-color);
}

</style>