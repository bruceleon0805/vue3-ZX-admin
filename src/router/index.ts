import { HOME_URL, LOGIN_URL, ROUTER_WHITE_LIST } from '@/config/config'
import { pinia } from '@/stores'
import { useGlobalStore } from '@/stores/global'
import { useRoutesStore } from '@/stores/routes'
import { storeToRefs } from 'pinia'
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
const globalStore = useGlobalStore(pinia)
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
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  console.log(token);
  if (token) {
    if (to.path === loginRoute) {
      next(homePath)
    } else {
      // 获取路由列表 初始化路由
      const routesStore = useRoutesStore(pinia)
      const { routes } = storeToRefs(routesStore)
      if (routes.value.length === 0) {
        if (isBackEndRoutes.value) {
          //后端路由

        } else {
          //前端路由
          await frontEndRoutes()
          console.log(to.path);
          console.log(to.query);
          next({ path: to.path, query: to.query });
        }
      } else {
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

export default router
