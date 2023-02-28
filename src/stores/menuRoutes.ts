
/**
 * 获取路由数据
 */

import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import type { MenuRoutesState } from "./menuRoutes.d";

export const useMenuRoutesStore = defineStore('menuRoutesStore', {
    state: (): MenuRoutesState => {
        return {
            menuRoutes: []
        }
    },
    actions: {
        async setRoutes(menuRoutes: RouteRecordRaw[]) {
            this.menuRoutes = menuRoutes
        }
    }
})