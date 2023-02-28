<template>
    <el-header class="layout-header">
        <div class="nav-bar">
            <el-icon @click="collapseChange">
                <component :is="isCollapse ? 'expand' : 'fold'"></component>
            </el-icon>
        </div>
    </el-header>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

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
    align-items: center;
    border-bottom: 1px solid #f1f2f3;
}
</style>