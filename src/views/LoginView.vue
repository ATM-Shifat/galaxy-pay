<script setup>

import { reactive, computed} from 'vue'
import {useRouter} from 'vue-router'
import {useToast} from 'vue-toastification'
import { galaxyStore } from '@/store';


const toast = useToast()
const router = useRouter()
const userStore = galaxyStore()

const form = reactive({
	
	email: "",
    password: "",
})


const submit = async () =>{

    if(!form.email)
        return toast.error("Email can not be empty!")
    if(!form.password)
        return toast.error("Password can not be empty!")
        

    try{
        const response = await userStore.login({
            email: form.email,
            password: form.password,
        })

        if(response.status === 200){
            router.push("/") 
            toast.success(response.data.message) 
        }
        
    }catch(error){
        console.error("Failed to Log in.",error)

        if(error.response && error.response.status === 401)
            toast.error(error.response.data.error)
        else
            toast.error("An error occured!")
    }
}


</script>

<template>
    <div class="form-container">
        <div class="form">
            <div class="title"> Log In</div>
            <form class="input-container" @submit.prevent="submit">
                <div class="input-container-div">
                    <label for="email">Email:</label>
                    <input name="email" type="email" v-model="form.email">
                </div>
                <div class="input-container-div">
                    <label for="password">Password:</label>
                    <input name="password" type="password" v-model="form.password">
                </div>
                <div class="button-container">
                    <button class="button" type="submit">Login</button>
                    
                    <!-- <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
                    <p v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</p>
                    <p v-if="emailError" class="error-message">{{ emailError }}</p>
                    <p v-if="phoneError" class="error-message">{{ phoneError }}</p>
                    <p v-if="nameError" class="error-message">{{ nameError }}</p>
                    <p v-if="serverError" class="error-message">{{ serverError }}</p>
                    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
                    <p v-if="loading" class="loading-message">Loading...</p> -->
                </div>
                <div class="redirect">
                    Do not have an account? 
                    <RouterLink class="link" to="/accounts/signup">Sign up</RouterLink>
                </div>
                
            </form>
        </div>
    </div>
</template>
