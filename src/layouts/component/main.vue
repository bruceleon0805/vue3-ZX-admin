
<template>
    <Tags />

    <el-main class="layout-main">
        <router-view v-slot="{ Component, route }">
            <transition :name="transitionName" mode="out-in">
                <keep-alive :include="keepAliveStore.keepAliveNames">
                    <component :is='Component' :key="route.path" v-if="isRouterShow"></component>
                </keep-alive>
            </transition>
        </router-view>
        <!-- 回到顶部 -->
        <el-backtop />
    </el-main>
</template>

<script setup lang="ts">
import { useKeepAliveStore } from '@/stores/keepAlive';
import { useThemeStore } from '@/stores/theme';
import { computed, defineAsyncComponent, provide, ref } from 'vue';

const Tags = defineAsyncComponent(() => import('@/layouts/tags/tags.vue'))

const keepAliveStore = useKeepAliveStore()

const themeStore = useThemeStore()
const transitionName = computed(() => themeStore.transitionName)



// 刷新当前页面
const isRouterShow = ref(true)
const refreshCurrentPage = (isRefresh: boolean) => {
    isRouterShow.value = isRefresh
}
provide("refresh", refreshCurrentPage)

</script>

<style scoped></style>