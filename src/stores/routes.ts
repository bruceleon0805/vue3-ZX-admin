
/**
 * 获取路由数据
 */

import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import type { RoutesState } from "./routes.d";

export const useRoutesStore = defineStore('routesStore', {
    state: (): RoutesState => {
        return {
            routes: []
        }
    },
    actions: {
        async setRoutes(menuRoutes: RouteRecordRaw[]) {
            this.routes = menuRoutes
        }
    }
})