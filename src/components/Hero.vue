<script setup>

import { defineProps, computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '@/store/store';


defineProps({
    title:{
        type: String,
        default: 'GalaxyPay'
    },
    subtitle: {
        type: String,
        default: 'It is a long established fact that a ' +  
        'reader will be distracted by the readable content.' 
    }
})


</script>

<template>
    <section class="hero">
        <div class="hero-left">
            <div class="hero-text">
                <div class="title">
                    {{title}}
                </div>
                <p class="subtitle">
                    {{subtitle}}
                </p>
            </div>
            <RouterLink class="button" to="/accoutns/signup">
                Sign Up 
            </RouterLink>
        </div>
        <div>
            <img class="hero-img" src="../assets/credit-card.svg" alt="credit">
        </div>

    </section>
</template>

<style scoped>

.hero{
    display: flex;
    justify-content: start;
    /* align-items: center; */
    height: 21rem;
    padding: 3rem 1.3rem;
    background-color: var(--secondary-color);
    background-position: center;
    background-size: cover;
}

.hero-left{
    margin: 5px 20px;
    text-align: start;
    max-width: 50vw;
}
.hero-right{
    margin: 5px 20px;
    text-align: end;
    max-width: 50vw;
}
.hero-text{
    margin-bottom: 3rem;
}

.hero 
img{
    width: 29rem;
    height: auto;
    filter: drop-shadow(0 0 100px rgba(192, 177, 177, 0.5));
}

.strokeme {
  color: var(--secondary-color);
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
  
}

.text-outline{
    margin-left: -1rem;
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--secondary-color);
    text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
}

.title{
    font-size: 3.5rem;
    font-weight:700;
    color: white;
    margin-bottom: 1rem;
}
.subtitle{
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
}


.button{
  background-color: #ffffff;
  color: var(--secondary-color);
  padding: .5rem 1rem;
  margin-top: 200px;
  border-radius: 10px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.button:hover{
  background-color: var(--secondary-color);
  border:1px white solid;
  color: white;
  transition:  0.3s ease;
}

</style>