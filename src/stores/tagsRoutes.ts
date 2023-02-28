import { defineStore } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';

/**
 * tags 路由列表
 */
export const useTagsRoutesStore = defineStore('tagsRoutesStore', {
    state: (): { tagsRoutes: RouteRecordRaw[] } => {
        return {
            tagsRoutes: []
        }
    },
    actions: {
        /**
         * 保存扁平化处理的路由 tagsRoutes
         * @param routes 
         */
        async setTagsRoutes(routes: RouteRecordRaw[]) {
            this.tagsRoutes = routes;
        }
    },
});
