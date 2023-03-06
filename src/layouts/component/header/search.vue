
<template>
    <div class="search-dialog">
        <el-dialog v-model="state.showSearch">
            <template #footer>
                <el-autocomplete :fetch-suggestions="menuSearch" @select="handleSelect" v-model="state.menuQuery"
                    placeholder="菜单搜索" ref="layoutMenuAutocompleteRef">
                    <template #prefix>
                        <el-icon>
                            <i-ep-search />
                        </el-icon>
                    </template>
                    <template #default="{ item }">
                        <div>
                            <el-icon>
                                <component :is="getOneEpIcon(item.meta?.icon)"></component>
                            </el-icon>
                            {{ item.meta?.title }}
                        </div>
                    </template>
                </el-autocomplete>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { store } from '@/stores';
import { useTagsRoutesStore } from '@/stores/tagsRoutes';
import { getOneEpIcon } from '@/utils/icon';
import { nextTick, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter, type RouteRecordRaw } from 'vue-router';
const tagsRoutesStore = useTagsRoutesStore(store)
const { tagsRoutes } = storeToRefs(tagsRoutesStore)
const layoutMenuAutocompleteRef = ref()

const state = reactive<{
    showSearch: boolean,
    menuQuery: string,
    tags: RouteRecordRaw[]
}>({
    showSearch: false,
    menuQuery: '',
    tags: []
})

const openSearch = () => {
    state.showSearch = true
    state.menuQuery = ''
    initTags()
    nextTick(() => {
        setTimeout(() => {
            layoutMenuAutocompleteRef.value.focus()
        }, 200);
    })

}

const initTags = () => {
    if (state.tags.length > 0) return false;
    tagsRoutes.value.map(item => state.tags.push(item))
}



const router = useRouter()
const handleSelect = (item: RouteRecordRaw) => {
    router.push(item.path)
    closeSearch()

}

const closeSearch = () => {
    state.showSearch = false
}


const menuSearch = (query: string, cb: Function) => {
    let results = query ? state.tags.filter((item: RouteRecordRaw) => (item.meta?.title as string).toLowerCase().includes(query)) : state.tags
    cb(results)
}


defineExpose({
    openSearch
})

</script>

<style lang="scss" scoped>
.search-dialog {
    position: relative;


    :deep(.el-dialog) {

        .el-dialog__header,
        .el-dialog__body {
            display: none;
        }

        .el-dialog__footer {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -25vh;
        }
    }

    :deep(.el-autocomplete) {
        width: 560px;
        position: absolute;
        top: 150px;
        left: 50%;
        transform: translateX(-50%);
    }

}
</style>