<template>
    <div class="container">
        <el-card shadow="hover">
            <div class="list-search">
                <el-form :rules="rules" :model="ruleForm" ref="formRef">
                    <el-row :gutter="48">
                        <el-col :span="8">
                            <el-form-item label="用户名称">
                                <el-input v-model="ruleForm.userName" placeholder="请输入用户名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="用户昵称">
                                <el-input v-model="ruleForm.userNickname" placeholder="请输入用户昵称"></el-input>
                            </el-form-item>
                        </el-col>
                        <template v-if="advanced">
                            <el-col :span="8">
                                <el-form-item label="关联角色">
                                    <el-input v-model="ruleForm.roleSign" placeholder="请输入关联角色"></el-input>
                                </el-form-item>
                            </el-col>
                        </template>
                        <el-col :span="!advanced && 8 || 24">
                            <span class="advanced-search">
                                <el-button type="primary" @click="submitForm(formRef)">查询</el-button>
                                <el-button type="primary" @click="resetForm(formRef)">重置</el-button>
                                <a class="ml8" @click="toggleAdvanced">
                                    {{ advanced ? '收起' : '展开' }}
                                    <Icon :name="advanced ? 'ep-ArrowUp' : 'ep-ArrowDown'" />
                                </a>
                            </span>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

            <el-table row-key="id" :data="table.data" v-loading="table.loading"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column label="部门名称" prop="deptName" show-overflow-tooltip></el-table-column>
                <el-table-column label="排序">
                    <template #default="scope">
                        {{ scope.$index }}
                    </template>
                </el-table-column>
                <el-table-column label="部门状态">
                    <template #default="scope">
                        <el-tag :type="scope.row.status ? 'success' : 'info'">{{ scope.row.status ? '启用' : '禁用' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="部门描述" prop="describe" show-overflow-tooltip></el-table-column>
                <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="scope">
                        <el-button type="primary"  size="small" text>新增</el-button>
                        <el-button type="primary"  size="small" text>修改</el-button>
                        <el-button type="warning"  size="small" text>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" class="mt15"
                :pager-count="5" :page-sizes="[10, 20, 30]" v-model:current-page="table.pagenum" background
                v-model:page-size="table.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="table.total">
            </el-pagination>

        </el-card>
    </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';

const advanced = ref(false)
const formRef = ref<FormInstance>()

const ruleForm = reactive({
    userName: '',
    userNickname: '',
    roleSign: ''
})

const rules = reactive<FormRules>({
    userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ]
})

/* 
切换高级搜索
*/
const toggleAdvanced = () => {
    advanced.value = !advanced.value
}
/**
 * 重置form
 * @param formEl 
 */
const resetForm = (formEl: FormInstance | undefined) => {
    formEl?.resetFields()
}

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

const table = reactive({
    data: [],
    loading: true,
    total: 0,
    pagesize: 10,
    pagenum: 1
})

const getTableData = () => {
    table.loading = true
    const data = []
    data.push({
        deptName: 'vueNextAdmin',
        createTime: new Date().toLocaleString(),
        status: true,
        sort: Math.random(),
        describe: '顶级部门',
        id: Math.random(),
        children: [
            {
                deptName: 'IT外包服务',
                createTime: new Date().toLocaleString(),
                status: true,
                sort: Math.random(),
                describe: '总部',
                id: Math.random(),
            },
            {
                deptName: '资本控股',
                createTime: new Date().toLocaleString(),
                status: true,
                sort: Math.random(),
                describe: '分部',
                id: Math.random(),
            },
        ],
    })
    table.data = data as any
    table.total = data.length
    setTimeout(() => {
        table.loading = false
    }, 500);
}


const onHandleSizeChange = (val: number) => {
    table.pagesize = val;
    getTableData();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
    table.pagenum = val;
    getTableData();
};


onMounted(() => {
    getTableData()
})



</script>

<style scoped>
.advanced-search {
    float: right;
}
</style>