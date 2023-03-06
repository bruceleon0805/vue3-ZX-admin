import { HOME_URL, LOGIN_URL, ROUTER_WHITE_LIST } from '@/config/config'
import { store } from '@/stores'
import { useGlobalStore } from '@/stores/global'
import { useMenuRoutesStore } from '@/stores/menuRoutes'
import { useTokenStore } from '@/stores/token'
import { storeToRefs } from 'pinia'
import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { frontEndRoutes } from './frontEnd'

import { staticRoutes, errorRoutes } from './route'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...errorRoutes, ...staticRoutes]
})


/**
 * 路由获取方式 前端 ｜｜ 后端
 * 
 */
const globalStore = useGlobalStore(store)
const { isBackEndRoutes } = storeToRefs(globalStore)



/**
 * 无需鉴权的路由名称
 */
const allowRoute = ROUTER_WHITE_LIST
const loginRoute = LOGIN_URL
const homePath = HOME_URL
/**
 * 导航守卫
 */
router.beforeEach(async (to, _, next) => {
  // token
  const tokenStore = useTokenStore(store)
  const token = tokenStore.getValidToken()
  if (token) {
    if (to.path === loginRoute) {
      next(homePath)
    } else {
      // 获取路由列表 初始化路由
      const menuRoutesStore = useMenuRoutesStore(store)
      const { menuRoutes: routes } = storeToRefs(menuRoutesStore)
      /**
       * 每次刷新 routes 首次为空 再次 路由生成后不再为空
       */
      if (routes.value.length === 0) {
        if (isBackEndRoutes.value) {
          //后端路由 TODO

        } else {
          //前端路由
          await frontEndRoutes()
          next({ path: to.path, query: to.query });
        }
      } else {
        // 路由已存在
        next()
      }
    }
  } else {
    if (allowRoute.includes(to.name as string) || allowRoute.includes(to.path as string)) {
      next()
    } else {
      next({ path: loginRoute, query: { redirect: to.fullPath } })
    }
  }
})


export const resetRouter = (): void => {
  const resetWhiteNameList = ['login', 'noAuth', 'notFound']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}



export const setupRouter = (app: App<Element>) => {
  app.use(router)
}


export default router
