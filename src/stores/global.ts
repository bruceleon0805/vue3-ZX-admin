/**
 * 全局配置
 */


import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalStore', {
  state() {
    return {
      //是否后端提供路由
      isBackEndRoutes: false
    }
  },
  actions: () => {

  }
})
