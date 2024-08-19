
import { defineStore } from 'pinia'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export const galaxyStore = defineStore('store', {
  state : () => ({
    user: null,
    token: null,
    transactions: null,
    role: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    stateUser: (state) => state.user,
    isAdmin: (state) => state.role === 'admin',
    stateTransactions: (state) => state.transactions
  },
  actions: {
    async signup(form){

        const response = await axios.post('/api/signup', {
          name: form.name,
          email: form.email,
          phone: form.phone,
          sentPassword: form.password,
        })

        return response

    },
    async login(form){

        const response = await axios.post('/api/login', {
          email: form.email,
          sentPassword: form.password
        })

        if(response.data.token && response.data.user){
          this.token = response.data.token
          this.user = response.data.user

          const decodedToken = jwtDecode(this.token)
          this.role = decodedToken.role
        }

        return response
    },
    logOut(){
      this.user = null
      this.token = null
      this.role = null
      this.transactions = null
    }

  },

  persist: true

})
