<template>
    <el-header class="layout-header">
        <div class="nav-bar" style="display: flex;height: 50px; align-items: center;border-bottom: 1px solid red;">
            <el-icon @click="collapseChange">
                <component :is="getOneEpIcon(isCollapse ? 'expand' : 'fold')"></component>
            </el-icon>
            <div class="header-container">
                面包屑
                图标等
                用户信息
            </div>
        </div>

        <Tags />

    </el-header>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

import { getOneEpIcon } from '@/utils/icon';
import { defineAsyncComponent } from 'vue';

const Tags = defineAsyncComponent(()=>import('@/layouts/tags/tags.vue'))


const themeStore = useThemeStore()
const { isCollapse } = storeToRefs(themeStore)

//切换菜单折叠状态
const collapseChange = () => {
    isCollapse.value = !isCollapse.value
}

</script>

<style lang="scss" scoped>
.layout-header {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
</style>