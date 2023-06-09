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

            <el-table :data="table.data" v-loading="table.loading">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="账户名称" prop="userName" show-overflow-tooltip></el-table-column>
                <el-table-column label="用户昵称" prop="userNickname"></el-table-column>
                <el-table-column label="关联角色" prop="roleSign"></el-table-column>
                <el-table-column label="部门" prop="department" show-overflow-tooltip></el-table-column>
                <el-table-column label="手机号" prop="phone" show-overflow-tooltip></el-table-column>
                <el-table-column label="邮箱" prop="email" show-overflow-tooltip></el-table-column>
                <el-table-column label="用户状态" prop="status" show-overflow-tooltip>
                    <template #default="scope">
                        <el-tag :type="scope.row.status ? 'success' : 'info'">{{ scope.row.status ? '启用' : '禁用' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="用户描述" prop="describe" show-overflow-tooltip></el-table-column>
                <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="130">
                    <template #default="scope">
                        <el-button type="primary" :disabled="scope.row.userName === 'admin'" size="small"
                            text>修改</el-button>
                        <el-button type="warning" :disabled="scope.row.userName === 'admin'" size="small"
                            text>删除</el-button>
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
    for (let index = 0; index < 2; index++) {
        data.push({
            userName: index === 0 ? 'admin' : 'test',
            userNickname: index === 0 ? '我是管理员' : '我是普通用户',
            roleSign: index === 0 ? 'admin' : 'common',
            department: index === 0 ? ['vueNextAdmin', 'IT外包服务'] : ['vueNextAdmin', '资本控股'],
            phone: '12345678910',
            email: 'vueNextAdmin@123.com',
            sex: '女',
            password: '123456',
            overdueTime: new Date(),
            status: true,
            describe: index === 0 ? '不可删除' : '测试用户',
            createTime: new Date().toLocaleString(),
        })

    }
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