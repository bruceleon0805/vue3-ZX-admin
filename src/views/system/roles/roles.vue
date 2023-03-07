<template>
    <div class="role-container">
        <el-card shadow="hover">
            <div class="search mb15">
                <el-input v-model="state.params.search" placeholder="请输入角色名称" style="max-width: fit-content;"></el-input>
                <el-button type="primary" class="ml10">
                    <i-ep-search />
                    查询
                </el-button>
                <el-button type="success" class="ml10">
                    <el-icon>
                        <i-ep-folder-add />
                    </el-icon>
                    新增角色
                </el-button>
            </div>
            <el-table height="500" :data="state.data" v-loading="state.loading">
                <el-table-column type="index" label="序号">
                </el-table-column>
                <el-table-column prop="roleName" label="角色名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="roleSign" label="角色标识" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sort" label="排序" show-overflow-tooltip></el-table-column>
                <el-table-column label="角色状态" show-overflow-tooltip>
                    <template #default="scope">
                        <el-tag type="success" v-if="scope.row.status"> 启用</el-tag>
                        <el-tag type="info" v-else> 禁用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="角色描述" prop="describe"></el-table-column>
                <el-table-column label="创建时间" show-overflow-tooltip prop="createTime"></el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" :disabled="scope.row.roleName === '超级管理员'" text>修改</el-button>
                        <el-button type="primary" :disabled="scope.row.roleName === '超级管理员'" text>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="sizeChange" @current-change="currentChange" :page-count="5" :page-sizes="[10, 20, 30]" v-model:current-page="state.params.pagenum" background
                v-model:page-size="state.params.pagesize" layout="total,sizes,prev,pager,next,jumper" :total="state.total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';


const state = reactive({
    data: [],
    loading: true,
    total: 0,
    params: {
        search: '',
        pagenum: 1,
        pagesize: 10
    }
})
const getData=()=>{
    state.loading=true
    const data=[]
    for(let i=0;i<20;i++){
        data.push({
            roleName:i===0?'超级管理员':'普通用户',
            roleSign:i===0?'admin':'common',
            describe:`测试角色${i+1}`,
            sort:i,
            status:true,
            createTime:new Date().toLocaleString()
        })

    }
    state.data = data as any
    state.total= data.length
    setTimeout(() => {
        state.loading=false
    }, 500);

}

const sizeChange=(val:number)=>{
    state.params.pagesize=val
    getData()
}
const currentChange=(val:number)=>{
    state.params.pagenum=val
    getData()
}

onMounted(() => {
    getData()
})

</script>

<style scoped></style>