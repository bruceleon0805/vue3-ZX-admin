import { defineStore } from "pinia";


export const useKeepAliveStore = defineStore('keepAliveStore', {
    state: (): { keepAliveNames: string[] } => {
        return {
            keepAliveNames: []
        }
    },
    actions: {
        /**
         * 添加
         */
        addKeepAliveName(name: string) {
            !this.keepAliveNames.includes(name) && this.keepAliveNames.push(name)
        },
        /**
         * 删除缓存
         * @param name 
         */
        deleteKeepAliveName(name: string) {
            this.keepAliveNames = this.keepAliveNames.filter(item => item !== name)
        },
        /**
         * 批量设置
         */
        setKeepAliveName(names: string[]) {
            this.keepAliveNames = names
        }
    }
})


