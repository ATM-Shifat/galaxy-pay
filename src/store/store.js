
import { defineStore } from 'pinia'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export const useStore = defineStore('store', {
  state : () => ({
    user: null,
    token: null,
    transactions: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.user
  },
  actions: {

  },

  persist: true

})
