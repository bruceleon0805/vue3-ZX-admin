<template>
    <div class="login-container">
        <el-container>
            <el-header style="background-color: aquamarine;">
                Header
            </el-header>
            <el-main style="justify-content: center;display: flex;">
                <el-form ref="ruleFormRef" :model="ruleForm" status-icon label-width="120px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="userName">
                        <el-input v-model="ruleForm.userName" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
                        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>
  

<script setup lang="ts">

import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { useTokenStore } from '@/stores/token';
import { pinia } from '@/stores';
import { useGlobalStore } from '@/stores/global';
import { storeToRefs } from 'pinia';
import { frontEndRoutes } from '@/router/frontEnd';
import { useUserInfoStore } from '@/stores/userInfo';
import { useRoute, useRouter } from 'vue-router';
import { HOME_URL } from '@/config/config';

const route = useRoute()
const router = useRouter()

const ruleFormRef = ref<FormInstance>()


const ruleForm = reactive({
    userName: 'admin',
    password: '',
})


const login = async () => {
    const tokenStore = useTokenStore(pinia)
    const token = Math.random().toString(36)
    tokenStore.setToken(token)
    const globalStore = useGlobalStore(pinia)
    const { isBackEndRoutes } = storeToRefs(globalStore)

    const userStore = useUserInfoStore()
    const {userInfo} = storeToRefs(userStore)
    userInfo.value.userName = ruleForm.userName
    if (isBackEndRoutes.value) {
        //后端路由


    } else {
        //前端路由
        const noAuth = await frontEndRoutes()
        //执行登录
        loginWithAuth(noAuth)
    }
}

const loginWithAuth = (noAuth:boolean|undefined)=>{
    if(noAuth){
        ElMessage.error('抱歉，您没有权限')
        // 退出操作
    }else{
        // 带跳转路由处理
        if(route.query?.redirect){
            router.push({
                path:<string>route.query?.redirect
            })
        }else{
            //跳转至首页
            router.push(HOME_URL)
        }
    }
    // 提示成功
    ElMessage.success('登录成功')
    
}






const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
            login()
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

</script>

<style lang="scss" scoped>
.login-container {
    width: 100%;
    height: 100%;
}

.demo-ruleForm {
    width: 50%;
}
</style>
