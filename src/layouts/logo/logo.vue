<template>
    <el-menu text-color="#1890ff" style="max-height: 60px;">
        <el-menu-item>
            <iconfont name="sofa" :size="28" style="margin-right: 10px;" />
            <template #title v-if="!isCollapse">
                <h1>Vue3-ZX-Admin</h1>
            </template>
        </el-menu-item>
    </el-menu>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

const themeStore = useThemeStore()
const { isCollapse } = storeToRefs(themeStore)




</script>

<style lang="scss" scoped></style>