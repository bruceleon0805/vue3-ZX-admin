
// 注册使用element-plus icon

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import type { App } from "vue";

export const useIcon = {
    ePlus: (app: App) => {
        registerIcon(app);
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