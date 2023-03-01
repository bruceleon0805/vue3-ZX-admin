
<template>
    <el-aside :width="asideWidth">
        <Logo />
        <el-menu active-text-color="#1890ff" :router="true" :collapse="isCollapse" :collapse-transition="false">
            <template v-for="item in menuRoutes">
                <el-sub-menu :key="item.path" :index="item.path" v-if="item.children && item.children.length">
                    <template #title>
                        <el-icon>
                            <component :is='getIcon(item.meta?.icon)'></component>
                        </el-icon>
                        <span>{{ item.meta?.title }}</span>
                    </template>
                    <!-- 子菜单 -->
                    <SubMenu :sub-menus="item.children" />
                </el-sub-menu>
                <template v-else>
                    <el-menu-item :index="item.path" :key="item.path">
                        <el-icon>
                            <component :is='getIcon(item.meta?.icon)'></component>
                        </el-icon>
                        <template #title>
                            <span>{{ item.meta?.title }}</span>
                        </template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </el-aside>
</template>

<script setup lang="ts">
import { useMenuRoutesStore } from '@/stores/menuRoutes';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import { capitalize, computed, defineAsyncComponent } from 'vue';

// 动态组件 icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const getIcon = (name: string | unknown) => {
    if (!name) return;
    // @ts-ignore
    return ElementPlusIconsVue[capitalize(name)]
}


const themeStore = useThemeStore()
const { isCollapse } = storeToRefs(themeStore)
const asideWidth = computed(() => isCollapse.value ? '64px' : '220px')

/**
 * 获取菜单
 */
const menuRoutesStore = useMenuRoutesStore()
const { menuRoutes } = storeToRefs(menuRoutesStore)

//子菜单
const SubMenu = defineAsyncComponent(() => import('@/layouts/component/subMenu.vue'))
const Logo = defineAsyncComponent(() => import('@/layouts/logo/index.vue'))
</script>

<style lang="scss">
/**
 el-sub-menu 下提示 父 子级联动
 */
// .el-sub-menu:hover {
//     .el-sub-menu__title {
//         color: var(--el-color-primary)
//     }
// }

/**
当前项颜色变化 
 */
.el-sub-menu__title:hover {
    color: var(--el-color-primary)
}

.el-menu-item:hover {
    background-color: var(--el-color-white);
    color: var(--el-color-primary);
}
</style>