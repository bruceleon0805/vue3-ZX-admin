<template>
    <div class="breadcrumb">
        <el-breadcrumb class="sm-hidden flex">
            <transition-group name="breadcrumb">
                <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">
                    <span v-if="index === breadList.length - 1" class="flex breadcrumb-span">
                        <el-icon :size="14" class="mr5">
                            <component :is="getOneEpIcon(item.meta?.icon)"></component>
                        </el-icon>
                        <div>{{ item.meta?.title }}</div>
                    </span>
                    <a v-else @click="breadClick(item)">
                        <el-icon :size="16" class="mr5">
                            <component :is="getOneEpIcon(item.meta?.icon)"></component>
                        </el-icon>
                        {{ item.meta?.title }}
                    </a>
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { useMenuRoutesStore } from '@/stores/menuRoutes';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter, type RouteRecordRaw } from 'vue-router';
import { getOneEpIcon } from '@/utils/icon';

const menuRoutesStore = useMenuRoutesStore()
const { menuRoutes } = storeToRefs(menuRoutesStore)
/**
 * 添加首页 
 * 路由第一项为首页 可根据情况修改
 */
const prependHome = menuRoutes.value[0]

const route = useRoute()
const router = useRouter()

let breadList = ref<RouteRecordRaw[]>([])
const getBread = async (path: string) => {
    breadList.value = await menuRoutesStore.initBread(path);
    // 不是首页再添加
    if (path !== prependHome.path) {
        breadList.value.unshift(prependHome)
    }
}

/**
 * breadcrumb 点击跳转
 */
const breadClick = (item: RouteRecordRaw) => {
    router.push(item.path)
}


/**
 * 组件挂载
 */
onMounted(() => {
    getBread(route.path)
})
/**
 * 路由更新
 */
onBeforeRouteUpdate(to => {
    getBread(to.path)
})














</script>

<style scoped lang="scss">
.breadcrumb {
    flex: 1;
    height: inherit;
    display: flex;
    align-items: center;
}

.menu-icon {
    cursor: pointer;
    height: 100%;
    width: 40px;
    opacity: 0.8;

    &:hover {
        opacity: 1;
    }
}

.breadcrumb-span {
    opacity: 0.7;
}


/* :deep(.el-breadcrumb__separator) {
    opacity: 0.7;
    color: var(--next-bg-topBarColor);
} */
/* 
:deep(.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link) {
    font-weight: unset !important;
    color: var(--next-bg-topBarColor);

    &:hover {
        color: var(--el-color-primary) !important;
    }
} */
</style>