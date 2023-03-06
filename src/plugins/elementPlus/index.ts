import type { App } from "vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

/* 
样式
*/
import 'element-plus/dist/index.css'


/**
 * 
 * @param app 
 */
export const setupElementPlus = (app: App) => {
    /*  for (let [key, component] of Object.entries(ElementPlusIconsVue)) {
         app.component(key, component)
     } */

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