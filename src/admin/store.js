import { defineStore } from "pinia"
import axios from "axios"
import { jwtDecode } from "jwt-decode"



export const useAdminStore = defineStore('admin-store', {
    state: () =>({
        adminToken: null,
        role: null,
        users: null
    }),
    getters: {
        isAdmin: (state) => state.role === 'admin',
        adminStateUsers: (state) => state.users,
    },
    actions: {
        async adminLogin(form){
            const response = await axios.post('/api/admin/log-in', {
                adminId: form.adminId,
                sentPassword: form.adminPassword
            })

            if(response.data.adminToken && response.data.users){
                this.adminToken = response.data.adminToken
                this.users = response.data.users

                const decodedToken = jwtDecode(this.adminToken)
                this.role = decodedToken.role
            }

            return response
        },
        adminLogOut(){
            this.admin = null
            this.adminToken = null
            this.role = null
        },
        async adminGetUsers(){
            const response = await axios.get('/api/admin/get-users', {
                headers: {"authorization": this.adminToken}
            })

            this.users = response.data.users

            return response
        },
        async adminDeleteUser(id){
            const response = await axios.delete('/api/admin/delete-user', {
                data: {id: id},
                headers: {"authorization": this.adminToken}
            })

            return response
        }
    },
    persist: true
})