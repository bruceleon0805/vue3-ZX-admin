<template>
    <div class="tags">
        <ul class="tags-ul">
            <li v-for="(item, index) in tagsList" :key="index" class="tags-li" :class="{ 'active': isActive(item) }"
                @click="tagsClick(item)">
                <el-icon v-if="isActive(item)" :size="12" class="tags-prepend"><i-ep-sunny /></el-icon>
                <span>{{ item.name }}</span>

                <template v-if="isActive(item)">
                    <el-icon @click.stop="refreshTags" class="ml5 tags-refresh" :size="14"><i-ep-refresh /></el-icon>
                    <el-icon @click.stop="closeTag(item)" v-if="!item.meta?.isFixed"
                        class="tags-close"><i-ep-close /></el-icon>
                </template>
            </li>
        </ul>

    </div>
</template>

<script setup lang="ts">
import { store } from '@/stores';
import { useKeepAliveStore } from '@/stores/keepAlive';
import { useTagsRoutesStore } from '@/stores/tagsRoutes';
import { storeToRefs } from 'pinia';
import { inject, nextTick, onBeforeMount, onMounted } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter, type RouteRecordRaw } from 'vue-router';

const tagsRoutesStore = useTagsRoutesStore(store)
const keepAliveStore = useKeepAliveStore(store)
const { tagsList, tagsRoutes } = storeToRefs(tagsRoutesStore)

const route = useRoute()
const router = useRouter()

/**
 * tags 路由初始化
 * 
 */
const initTags = () => {
    // 添加当前路由
    addCurrentTag(route.path)
}


/**
 * 添加当前路由至 tagsList
 */
const addCurrentTag = async (path: string) => {
    // 查找当前路由是否在 全部tagsRoutes列表中，如果有取出
    const hasTags: RouteRecordRaw = tagsRoutes.value.find(tag => tag.path === path) || Object()
    if (Object.keys(hasTags).length) {
        // 添加当前路由至 tagsList
        await tagsRoutesStore.setTagsList(hasTags)
    }
}

/**
 * 判断是否激活状态
 * @param item 路由
 */
const isActive = (item: RouteRecordRaw) => {
    return route.path === item.path
}

/**
 * provide inject 方式 纵向层级关系
 * 切换显示隐藏 router view 达到刷新
 * 横向层级关系推荐 mitt.js
 * TODO
 */
const refreshCurrentPage: Function = inject('refresh') as Function
const refreshTags = () => {
    setTimeout(() => {
        keepAliveStore.deleteKeepAliveName(route.name as string)
        refreshCurrentPage(false)
        nextTick(() => {
            keepAliveStore.addKeepAliveName(route.name as string)
            refreshCurrentPage(true)
        })
    }, 200);
}

/**
 * 路由更新前
 */
onBeforeRouteUpdate(async (to) => {
    await addCurrentTag(to.path)
})

/**
 * 组件挂载前
 */
onBeforeMount(() => {
    initTags()

})
/**
 * 组件挂载后
 */
onMounted(() => {
    //console.log('onMounted');
})

/**
 * tags 点击跳转页面
 */
const tagsClick = (item: RouteRecordRaw) => {
    router.push(item)

}
/**
 * 关闭当前 tag
 * @param item 
 */
const closeTag = async (item: RouteRecordRaw) => {
    /**
     * 数组 最后一个路由
     */
    const lastRoute = await tagsRoutesStore.deleteCurrentTag(item)
    router.push(lastRoute)
}


</script>

<style lang="scss" scoped>
// default
.tags {
    background-color: var(--el-color-white);
    border-bottom: 1px solid var(--next-border-color-right);
    position: relative;
    z-index: 4;

    &-ul {
        list-style: none;
        margin: 0;
        padding: 0;
        height: 34px;
        display: flex;
        align-items: center;
        color: var(--el-text-color-regular);
        font-size: 12px;
        white-space: nowrap;
        padding: 0 15px;


    }

    &-li {
        height: 26px;
        line-height: 26px;
        display: flex;
        align-items: center;
        border: 1px solid var(--el-border-color-lighter);
        padding: 0 15px;
        margin-right: 5px;
        border-radius: 2px;
        position: relative;
        z-index: 0;
        cursor: pointer;
        justify-content: space-between;

        &:hover {
            background-color: var(--el-color-primary-light-9);
            color: var(--el-color-primary);
            border-color: var(--el-color-primary-light-5);
        }
    }

    &-prepend {
        position: relative;
        left: -5px;
        font-size: 12px;
    }

    &-close {
        border-radius: 100%;
        position: relative;
        right: -5px;
        height: 14px;
        width: 14px;
        text-align: center;

        &:hover {
            color: var(--el-color-white);
            background-color: var(--el-color-primary-light-3);
        }

    }

    .active {
        color: var(--el-color-white);
        background-color: var(--el-color-primary);
        border-color: var(--el-color-primary);
        transition: border-color 3s ease;
    }
}
</style>