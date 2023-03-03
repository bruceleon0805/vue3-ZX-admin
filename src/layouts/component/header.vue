<template>
    <el-header class="layout-header">
        <div class="nav-container">
            <div class="breadcrumb-box">
                <el-icon :size="16" class="menu-icon mx10" @click="collapseChange">
                    <component :is="getOneEpIcon(isCollapse ? 'expand' : 'fold')"></component>
                </el-icon>
                <div class="hidden">logo</div>
                <Breadcrumb />
                <div class="user">user</div>
            </div>
        </div>
    </el-header>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue';
import { getOneEpIcon } from '@/utils/icon';

const Breadcrumb = defineAsyncComponent(() => import('@/layouts/component/breadcrumb.vue'))


const themeStore = useThemeStore()
const { isCollapse } = storeToRefs(themeStore)

//切换菜单折叠状态
const collapseChange = () => {
    isCollapse.value = !isCollapse.value
}

</script>

<style lang="scss" scoped>
.layout-header {
    padding: 0 !important;
    height: auto !important;
}

.nav-container {
    display: flex;
    flex-direction: column;
    widows: 100%;
    height: 100%;
}

.breadcrumb-box {
    height: 50px;
    display: flex;
    align-items: center;
    background-color: var(--next-bg-topBar);
    border-bottom: 1px solid var(--next-border-color-light);
}
</style>