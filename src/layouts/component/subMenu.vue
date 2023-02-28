<template>
    <template v-for="item in subMenus">
        <el-sub-menu :key="item.path" :index="item.path" v-if="item.children && item.children.length > 0">
            <template #title>
                <el-icon>
                    <component :is="item.meta?.icon"></component>
                </el-icon>
                <span>{{ item.meta?.title }}</span>
            </template>
            <subMenu :sub-menus="item.children" />
        </el-sub-menu>
        <template v-else>
            <el-menu-item :index="item.path" :key="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta?.icon"></component>
                    </el-icon>
                    <span>{{ item.meta?.title }}</span>
                </template>
            </el-menu-item>
        </template>
    </template>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'

/**
 * 基于类型的声明
 */
const props = defineProps<{
    subMenus: Array<RouteRecordRaw>
}>()

</script>

<style scoped lang="scss">

</style>