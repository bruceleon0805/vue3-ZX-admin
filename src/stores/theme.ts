import { defineStore } from "pinia";

import { componentSize, type ThemeParams } from './theme.d'

/**
 * 主题配置
 */
export const useThemeStore = defineStore('themeStore', {
    persist: {
        /* 需要持久化的项目 */
        paths: ['isCollapse', 'componentSize', 'primary']
    },
    state: (): ThemeParams => {
        return {
            primary: '#409eff', // 主题颜色
            // 是否折叠菜单
            isCollapse: false,
            // 路由切换动画 可选 slide-right|slide-left|opacity|move|fade
            transitionName: 'slide-right',
            // element-plus 组件大小 配置  'large' | 'default' | 'small'
            // https://element-plus.gitee.io/zh-CN/component/config-provider.html#config-provider-attributes
            componentSize: componentSize.DEFAULT
        }
    },
    actions: {

    }
})