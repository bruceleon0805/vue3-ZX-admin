
<template>
    <el-aside :width="asideWidth" class="layout-aside">
        <Logo />
        <el-menu :unique-opened="true" :default-active="defaultActive" style="height: fit-content;" active-text-color="#1890ff" :router="true"
            :collapse="isCollapse" :collapse-transition="false">
            <template v-for="item in menuRoutes">
                <el-sub-menu :key="item.path" :index="item.path" v-if="item.children && item.children.length">
                    <template #title>
                        <Icon :name="item.meta?.icon" />
                        <span>{{ item.meta?.title }}</span>
                    </template>
                    <!-- 子菜单 -->
                    <SubMenu :sub-menus="item.children" />
                </el-sub-menu>
                <template v-else>
                    <el-menu-item :index="item.path" :key="item.path">
                        <Icon :name="item.meta?.icon" />
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
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const defaultActive = computed(() => route.path)



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
const Logo = defineAsyncComponent(() => import('@/layouts/logo/logo.vue'))
</script>

<style lang="scss">
.layout-aside {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-x: hidden;
}

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