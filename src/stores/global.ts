/**
 * 全局配置
 */
import { defineStore } from 'pinia'
import { I18N, type GlobalState } from './global.d'
export const useGlobalStore = defineStore('globalStore', {
  state(): GlobalState {
    return {
      //是否后端提供路由
      isBackEndRoutes: false,
      /* 语言 */
      i18n: I18N.ZHCN
    }
  },
  actions: () => {

  }
})
