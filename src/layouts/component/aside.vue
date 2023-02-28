
<template>
    <el-aside :width="asideWidth">
        <el-menu default-active="2" :collapse="isCollapse" @open="handleOpen" @close="handleClose" :collapse-transition="false">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>Navigator One</span>
                </template>
                <el-menu-item-group>
                    <template #title><span>Group One</span></template>
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title><span>item four</span></template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
                <el-icon>
                    <i-ep-menu />
                </el-icon>
                <template #title>Navigator Two</template>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <el-icon>
                    <document />
                </el-icon>
                <template #title>Navigator Three</template>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon>
                    <setting />
                </el-icon>
                <template #title>Navigator Four</template>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const themeStore = useThemeStore()
const { isCollapse } = storeToRefs(themeStore)

const asideWidth = computed(() => isCollapse.value ? '64px' : '220px')

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}


const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}


</script>

<style lang="scss" scoped></style>