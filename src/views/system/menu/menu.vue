<template>
    <div class="menu-manage">
        <el-card shadow="hover">

            <div class="search">
                <el-input placeholder="请输入菜单名称" style="max-width: fit-content;"></el-input>
                <el-button type="primary" class="ml10">
                    <el-icon><i-ep-search /></el-icon>
                    查询
                </el-button>
                <el-button type="success">
                    <el-icon><i-ep-folder-add /></el-icon>
                    新增菜单
                </el-button>
            </div>
            <el-table :data="state.data" v-loading="state.loading" row-key="path"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column label="菜单名称" show-overflow-tooltip>
                    <template #default="scope">
                        <Icon :name="scope.row.meta.icon" />
                        <span class="ml10">{{ scope.row.meta.title }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="path" label="路由路径" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="组件路径" show-overflow-tooltip>
                    <template #default="scope">
                        <span>{{ scope.row.component }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="权限标识" show-overflow-tooltip>
                    <template #default="scope">
                        <span>{{ scope.row.meta.roles }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="排序" show-overflow-tooltip>
                    <template #default="scope">
                        {{ scope.$index }}
                    </template>
                </el-table-column>
                <el-table-column label="类型" show-overflow-tooltip>
                    <template #default="scope">
                        <el-tag type="success" size="small">菜单</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip>
                    <template #default="scope">
                        <el-button type="primary" text size="small">新增</el-button>
                        <el-button type="primary" text size="small">修改</el-button>
                        <el-button type="primary" text size="small">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { store } from '@/stores';
import { useMenuRoutesStore } from '@/stores/menuRoutes';
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

const menuRoutesStore = useMenuRoutesStore(store)
const { menuRoutes } = storeToRefs(menuRoutesStore)

const state = reactive<{ loading: boolean, data: RouteRecordRaw[] }>({
    loading: true,
    data: []
})

const getData = () => {
    state.loading = true
    setTimeout(() => {
        state.data = menuRoutes.value
        state.loading = false
    }, 500);
}

onMounted(() => {
    getData()
})





</script>

<style scoped></style>