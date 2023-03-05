import { defineAsyncComponent, type App } from "vue";

const iconfont = defineAsyncComponent(() => import('@/components/iconfont/iconfont.vue'))
//const iconfontSymbol = defineAsyncComponent(() => import('@/components/iconfont/iconfontSymbol.vue'))

export const setupIconFont = (app: App) => {
    /**
         * 标签为 <iconfont></iconfont>
         * 首字母大小写都行
         */
    app.component('iconfont', iconfont)
    // 或
    //app.component('iconSymbol', iconfontSymbol)
}