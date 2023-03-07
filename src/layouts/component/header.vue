<template>
    <el-header class="layout-header">
        <div class="nav-container">
            <div class="breadcrumb-box">
                <Icon :name="isCollapse ? 'ep-Expand' : 'ep-Fold'" :size="16" class="menu-icon mx10" @click="collapseChange"/>
                <div class="hidden">logo</div>
                <Breadcrumb />
                <User />
            </div>
        </div>
    </el-header>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue';

const Breadcrumb = defineAsyncComponent(() => import('@/layouts/component/breadcrumb.vue'))
const User = defineAsyncComponent(() => import('@/layouts/component/user.vue'))


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