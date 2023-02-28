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
        }
    },
    actions: {

    }
})