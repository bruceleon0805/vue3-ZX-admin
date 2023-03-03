
/**
 * 获取路由数据
 */

import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import type { MenuRoutesState } from "./menuRoutes.d";

export const useMenuRoutesStore = defineStore('menuRoutesStore', {
    state: (): MenuRoutesState => {
        return {
            menuRoutes: [],

            //生成面包屑的辅助参数
            breadCrumb: {
                breadList: [],
                first_: ''
            }
        }
    },
    actions: {
        async setRoutes(menuRoutes: RouteRecordRaw[]) {
            this.menuRoutes = menuRoutes
        },
        /**
         * 获取面包屑
         * @param routePath 当前页面路由path
         */
        async initBread(routePath: string) {
            const routeSplit = routePath.split('/')
            routeSplit.shift() //去除空首项
            // 初始化
            this.breadCrumb.first_ = '/' + routeSplit[0]
            this.breadCrumb.breadList = []
            //生成
            this.breadLoop(this.menuRoutes, routeSplit)
            return this.breadCrumb.breadList
        },
        /**
         * 获取 breadcrumb
         * 1 获取首页
         * 2 分解 路由 比对 menuRoutes 存在则 存入 breadcrumbList
         *    /system  /system/menu
         * 3 存在子节点则继续比对
         * 
         */
        breadLoop(menuRoutes: RouteRecordRaw[], routeSplit: string[]) {
            menuRoutes.map(item => {
                routeSplit.map((_, index) => {
                    if (this.breadCrumb.first_ === item.path) {
                        this.breadCrumb.first_ += `/${routeSplit[index + 1]}`
                        this.breadCrumb.breadList.push(item)
                        if (item.children) this.breadLoop(item.children, routeSplit)
                    }
                })
            })

        }
    }
})