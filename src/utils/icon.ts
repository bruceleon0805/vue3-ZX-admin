
// 注册使用element-plus icon

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const iconfont = defineAsyncComponent(() => import('@/components/iconfont/iconfont.vue'))
//const iconfontSymbol = defineAsyncComponent(() => import('@/components/iconfont/iconfontSymbol.vue'))

import { capitalize, defineAsyncComponent, type App } from "vue";

export const useIcon = {
    ePlus: (app: App) => {
        registerIcon(app);
    },
    iconfont: (app: App) => {
        /**
         * 标签为 <iconfont></iconfont>
         * 首字母大小写都行
         */
        app.component('iconfont', iconfont)
        // 或
        //app.component('iconSymbol', iconfontSymbol)
    }
}

// 注册组件
const registerIcon = (app: App, allowList: string[] = []) => {
    for (let [key, component] of Object.entries(ElementPlusIconsVue)) {
        if (allowList.length !== 0) {
            if (allowList.includes(key.toLowerCase())) {
                app.component(key, component)
            }
        } else {
            app.component(key, component)
        }
    }
}

/**
     * 从 ElementPlusIconsVue 获取一个element-plus icon
     * 待 优化
     */
export const getOneEpIcon = (iconName: string | unknown) => {
    if (!iconName) return;
    // @ts-ignore
    return ElementPlusIconsVue[capitalize(iconName)]
}