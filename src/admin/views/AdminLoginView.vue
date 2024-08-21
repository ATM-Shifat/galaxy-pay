<script setup>

import { reactive, computed} from 'vue'
import {useRouter} from 'vue-router'
import {useToast} from 'vue-toastification'
import { useAdminStore } from '@/admin/store';


const toast = useToast()
const router = useRouter()
const adminStore = useAdminStore()

const form = reactive({
	
	adminId: "",
    adminPassword: "",
})


const submit = async () =>{

    if(!form.adminId || !form.adminPassword)
        return toast.error("All fields are requires!")

    try{
        const response = await adminStore.adminLogin({
            adminId: form.adminId,
            adminPassword: form.adminPassword,
        })

        if(response.status === 200){
            router.push("/admin/") 
            toast.success(response.data.message) 
        }
        
    }catch(error){
        console.error("Failed to Log in.",error)

        if(error.response && error.response.status === 401)
            toast.error(error.response.data.error)
        else if(error.response && error.response.data.error)
            toast.error(error.response.data.error)
        else
            toast.error("An error occured!")
    }
}


</script>

<template>
    <div class="form-container">
        <div class="form">
            <div class="title"> Admin Log In</div>
            <form class="input-container" @submit.prevent="submit">
                <div class="input-container-div">
                    <label for="adminId">Admin Id:</label>
                    <input name="adminId" type="text" v-model="form.adminId">
                </div>
                <div class="input-container-div">
                    <label for="password">Password:</label>
                    <input name="password" type="password" v-model="form.adminPassword">
                </div>
                <div class="button-container">
                    <button class="button" type="submit">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>
