import { defineStore } from "pinia";




export const useTokenStore = defineStore('tokenStore', {
    state: () => {
        return {
            token: '',
            expired: 0 // 过期时间
        }
    },
    getters: {
        getToken: (state) => {
            return state.token // 获取token 失效返回false
        }
    },
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setExpired(expired_time: number) {
            //设置过期时间
            this.expired = expired_time
        }
    }
})


