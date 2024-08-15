<script setup>

import { reactive, computed} from 'vue'

const form = reactive({
	
	name: "John Doe",
	email: "example@mail.com",
	phone: "+880",
    password: "",
    confirmPassword: "",
})

const submit = () =>{
    try{
        console.log("hello")
    }catch(error){
        console.error("Failed to signup!",error)
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
                    <input name="email" type="email" v-model="form.email">
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
    color: var(--hover-color);
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

</style>