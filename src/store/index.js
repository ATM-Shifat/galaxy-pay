
import { defineStore } from 'pinia'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export const galaxyStore = defineStore('store', {
  state : () => ({
    userAccount: null,
    token: null,
    transactions: null,
    role: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.userAccount,
    stateUser: (state) => state.user,
    isAdmin: (state) => state.role === 'admin',
    stateTransactions: (state) => state.transactions
  },
  actions: {
    async signup(form){

        const response = await axios.post('/api/sign-up', {
          name: form.name,
          email: form.email,
          phone: form.phone,
          sentPassword: form.password,
        })

        return response

    },
    async login(form){

        const response = await axios.post('/api/log-in', {
          email: form.email,
          sentPassword: form.password
        })

        if(response.data.token && response.data.user){
          this.token = response.data.token
          this.userAccount = response.data.account
          this.transactions = response.data.transactions

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
    },
    async getBalance() {
      const response = await axios.get('/api/get-balance', {
        params: {account: this.userAccount},
        headers: {"authorization": this.token}
      })

      return response
    },
    async transferFunds(form){
      const response =  await axios.post('/api/transfer-funds',
        { from: this.userAccount,
          to: form.receiver,
          amount: form.amount
        },{
        headers: {"authorization": this.token}
      })


      return response
    }

  },

  persist: true

})
