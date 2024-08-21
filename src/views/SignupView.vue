<script setup>

import { reactive, computed} from 'vue'
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { galaxyStore } from "@/store";

import { validEmail, validPassword } from '@/utilities/utilities';

const toast = useToast()
const router = useRouter()
const userStore = galaxyStore()

const form = reactive({
	
	name: "",
	email: "",
	phone: "",
    password: "",
    confirmPassword: "",
})


const submit = async() =>{

    if(!form.name)
        return toast.error("Name can not be empty!")
    if(!form.email)
        return toast.error("Email can not be empty!")
    if(!form.phone)
        return toast.error("Phone can not be empty!")
    if(!form.password)
        return toast.error("Password can not be empty!")
    if(!form.confirmPassword)
        return toast.error("Confirm Password can not be empty!")

    if(!validEmail(form.email))
        return toast.error("Email is not Valid!")
    if(!validPassword(form.password)){
        return toast.error("Password must be at least 6 characters, at least one letter and a digit!")
    }
    if(form.password !== form.confirmPassword)
        return toast.error("Passwords should match!")
        
    
    try{

        const response = await userStore.signup({
            name: form.name,
            email: form.email.toLowerCase(),
            phone: form.phone,
            password: form.password,
        })
        
        if(response.status === 201){

            form.name = ""
            form.email = ""
            form.phone = ""
            form.password = ""
            form.confirmPassword = ""

            router.push("/accounts/login")
            toast.success(response.data.message) 

        }

    }catch(error){
        console.error("Failed to create user.",error)

        if(error.response && error.response.status === 403)
            toast.error(error.response.data.error)
        else{
            toast.error("An error occurred")
        }
    }
}

</script>

<template>
    <div class="form-container">
        <div class="form">
            <div class="title"> Sign Up</div>
            <form class="input-container" @submit.prevent="submit">
                <div class="input-container-div">
                    <label for="name">Name:</label>
                    <input name="name" type="text" v-model="form.name">
                </div>
                <div class="input-container-div">
                    <label for="email">Email:</label>
                    <input name="email" type="text" v-model="form.email">
                </div>
                <div class="input-container-div">
                    <label for="phone">Phone:</label>
                    <input name="phone" type="text" v-model="form.phone">
                </div>
                <div class="input-container-div">
                    <label for="password">Password:</label>
                    <input name="password" type="password" v-model="form.password">
                </div>
                <div class="input-container-div">
                    <label for="confirmPassword">Confirm Password:</label>
                    <input name="confirmPassword" type="password" v-model="form.confirmPassword">
                </div>
                <div class="button-container">
                    <button class="button" type="submit">Signup</button>
                    
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
                    Already have an account? 
                    <RouterLink class="link" to="/accounts/login">Login</RouterLink>
                </div>
                
            </form>
        </div>
    </div>
</template>

<style scoped>

</style>