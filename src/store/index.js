
import { defineStore } from 'pinia'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export const galaxyStore = defineStore('store', {
  state : () => ({
    user: null,
    token: null,
    role: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    stateUser: (state) => state.user,
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
    },
    async transferFunds(form){
      const response =  await axios.post('/api/transfer-funds',
        { from: this.user.account,
          to: form.receiver,
          amount: form.amount
        },{
        headers: {"authorization": this.token}
      })

      return response
    },
    async getProfile(){
      const response = await axios.get('/api/get-profile', {
        params: {account: this.user.account},
        headers: {"authorization": this.token}
      })

      this.user = response.data.user
      
      return response
    }
  },

  persist: true

})
