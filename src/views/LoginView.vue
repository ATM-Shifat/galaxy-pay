<script setup>

import { reactive, computed} from 'vue'
import {useRouter} from 'vue-router'
import {useToast} from 'vue-toastification'


const toast = useToast()
const router = useRouter()

const form = reactive({
	
	email: "",
    password: "",
})


const submit = () =>{

    if(!form.email)
        return toast.error("Email can not be empty!")
    if(!form.password)
        return toast.error("Password can not be empty!")
        

    try{
        
        router.push("/") 
        toast.success("Successfully Logged in!") 
        
    }catch(error){
        toast.error("Failed to Log in!")
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

<style scoped>

.form-container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
}
.form{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px;
    padding: 40px 30px;
    border-radius: 20px;
    max-width: 50rem;
    box-shadow: 0px 2px 10px gray;
}

.title{
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 20px;
}

.input-container{
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 0px 20px;
}

.input-container-div{
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 5px 0px;
    
}

.input-container label{
    color: var(--primary-color);
    font-weight: 400;
}

.input-container input{
    padding: 10px;
    border: 1px solid var(--hover-color);
    border-radius: 30px;
    height: 1rem;
    margin-bottom: 10px;
    font-size: 1rem;
    transition: border-color 0.3s ease, color 0.3s ease;
    outline: none;
    color: gray;
}
.input-container input:hover{
    box-shadow: 0px 1px 5px #999898;
}

.button-container{
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 10px;   
}



.button{
  display: block;
  background-color: #fff;
  color: var(--secondary-color);
  padding: .4rem 1.2rem;
  border: 1px solid var(--secondary-color);
  border-radius: 20px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.button:hover{
  background-color: var(--secondary-color);
  /* border:1px solid var(--secondary-color); */
  color: #fff;
  box-shadow: 0px 2px 10px gray;
  transition:  0.3s ease;
}

.redirect{
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  color: gray;
}
.link{
  color: var(--primary-color);
  text-decoration: none;
  margin-left: 5px; ;
}

.link:hover{
  text-shadow: 0px 1px 2px gray;
  transition: color 0.3s ease;
}
</style>