/**
 * 全局配置
 */
import { defineStore } from 'pinia'
import { I18N, type GlobalState } from './global.d'

/* element-plus 语言包 */
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';
import { store } from '.';

const elLocalMap = {
  'zh-CN': zhCn,
  en: en
}

// 多语言
export const localeMap = [
  {
    lang: 'zh-CN',
    name: '简体中文'
  },
  {
    lang: 'en',
    name: 'English'
  }
]


export const useGlobalStore = defineStore('globalStore', {
  persist: {
    paths: ['elLocal', 'local']
  },
  state: (): GlobalState => {
    return {
      //是否后端提供路由
      isBackEndRoutes: false,
      /* 语言 */
      local: I18N.ZHCN,
      /* elPlus 语言包 */
      elLocal: elLocalMap[I18N.ZHCN]
    }
  },
  actions: {
    setCurrentLocal(lang: I18N) {
      this.local = lang
      this.elLocal = elLocalMap[lang]
    }
  }
})

export const useGlobalStoreWithOut = () => {
  return useGlobalStore(store)
}

export { I18N };
