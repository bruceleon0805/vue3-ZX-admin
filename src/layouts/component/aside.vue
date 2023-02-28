
<template>
    <el-aside :width="asideWidth">
        <el-menu active-text-color="#1890ff" :router="true" background-color="white" default-active="2"
            :collapse="isCollapse" :collapse-transition="false">
            <template v-for="item in menuRoutes">
                <el-sub-menu :key="item.path" :index="item.path" v-if="item.children && item.children.length">
                    <template #title>
                        <el-icon>
                            <component :is='item.meta?.icon'></component>
                        </el-icon>
                        <span>{{ item.meta?.title }}</span>
                    </template>
                    <!-- 子菜单 -->
                    <SubMenu :sub-menus="item.children" />
                </el-sub-menu>
                <template v-else>
                    <el-menu-item :index="item.path" :key="item.path">
                        <template #title>
                            <el-icon>
                                <component :is='item.meta?.icon'></component>
                            </el-icon>
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
import { computed, defineAsyncComponent } from 'vue';

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
</script>

<style lang="scss">
/**
 el-sub-menu 下提示 父 子级联动
 */
.el-sub-menu:hover {
    .el-sub-menu__title {
        color: red !important
    }
}

/**
当前项颜色变化 
 */
// .el-sub-menu__title:hover {
//     color: red !important
// }



.el-menu-item:hover {
    background-color: #fff;
    color: red !important;
}
</style>