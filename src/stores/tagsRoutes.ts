import { defineStore } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';

/**
 * tags 路由列表
 */
export const useTagsRoutesStore = defineStore('tagsRoutesStore', {
    state: (): { tagsRoutes: RouteRecordRaw[], tagsList: RouteRecordRaw[] } => {
        return {
            tagsRoutes: [], // tags所有合法路由
            tagsList: [], //当前tags显示路由 
        }
    },
    getters: {
        /**
         * 从保存的 tagsRoutes 中获取 meta.isFixed=true的路由
         * @param state 
         * @returns 固定显示的路由
         */
        getFixedTags: (state): RouteRecordRaw[] => state.tagsRoutes.map((route: RouteRecordRaw) => route.meta?.isFixed ? route : Object()).filter((v: {}) => Object.keys(v).length)
    },
    actions: {
        /**
         * 保存扁平化处理的路由 tagsRoutes
         * 当前路由比对tagsRoutes， 显示当前tags 需要展示的路由
         * @param routes 
         */
        async setTagsRoutes(routes: RouteRecordRaw[]) {
            this.tagsRoutes = routes;
        },
        async setTagsList(newTags: RouteRecordRaw) {
            /**
             * 固定显示的路由 + 原有tagsList +  加新增的路由
             * 1 判断 是否在已有 tagsList 中
             */
            if (!this.tagsList.length) {
                this.tagsList.push(...this.getFixedTags)
            }
            // 判断原有tagsList是否存在
            const isExist = this.tagsList.some(route => route.path.includes(newTags.path))
            if (!isExist) {
                this.tagsList.push(newTags)
            }
        },
        /**
         * 删除当前tags
         * @param tagRoute 
         */
        async deleteCurrentTag(tagRoute: RouteRecordRaw) {
            // 在固定tags中直接返回
            if (this.getFixedTags.some(route => route.path.includes(tagRoute.path))) return tagRoute;
            // 删除选中的 tag
            const index = this.tagsList.findIndex(item => item.path === tagRoute.path)
            index !== -1 && this.tagsList.splice(index, 1)
            // 返回最后一个 供跳转
            return this.tagsList.slice(-1)[0]
        },
        /**
         * 除去固定显示的路由
         * 删除所有tags 
         */
        async deleteAllTags() {
            // 直接赋值 固定路由
            this.tagsList = this.getFixedTags
        },
        /**
         * 删除其他 tags
         * @param tagRoute 
         */
        async deleteOtherTags(tagRoute: RouteRecordRaw) {
            // 固定路由 + 当前路由
            this.tagsList = [...this.getFixedTags, tagRoute]
        }
    },
});
