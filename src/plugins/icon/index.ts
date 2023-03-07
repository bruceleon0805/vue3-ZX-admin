import { defineAsyncComponent, type App } from "vue";

const icon = defineAsyncComponent(() => import('@/components/icon/icon.vue'))

// 全部导入
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export const setupIcon = (app: App) => {
    // element-plus icon
    setupElementPlusIcon(app)
    /**
         * 标签为 <Icon></Icon>
         * 首字母大小写都行
         */
    app.component('Icon', icon)
}
/* 
    组册 elementPlus Icon 添加前缀ep-
*/
const setupElementPlusIcon = (app: App) => {
    for (let [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(`ep-${key}`, component)
    }
}