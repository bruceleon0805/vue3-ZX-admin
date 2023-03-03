import { defineStore } from "pinia";

import type { ThemeParams } from './theme.d'

/**
 * 主题配置
 */
export const useThemeStore = defineStore('themeStore', {
    state: (): ThemeParams => {
        return {
            // 是否折叠菜单
            isCollapse: false,
            // 路由切换动画 可选 slide-right|slide-left|opacity|move|fade
            transitionName: 'slide-right'
        }
    },
    actions: {

    }
})