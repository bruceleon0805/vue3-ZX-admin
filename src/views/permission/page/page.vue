<template>
    <div class="layout-content">
        <el-alert type="warning" title="提示：切换权限演示" :closable="false"></el-alert>
        <el-alert type="success" :title="`当前页面权限：[${userInfo.roles}],当前用户按钮权限：[${userInfo.btnActionList}]`"
            :closable="false"></el-alert>
        <el-card shadow="hover" header="切换用户演示权限">
            <el-radio-group v-model="userAuth" @change="authChange" size="default">
                <el-radio-button label="admin"></el-radio-button>
                <el-radio-button label="common"></el-radio-button>
            </el-radio-group>

        </el-card>

    </div>
</template>

<script setup lang="ts">
import { frontEndRoutes } from '@/router/frontEnd';
import { store } from '@/stores';
import { useUserInfoStore } from '@/stores/userInfo';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';


const userInfoStore = useUserInfoStore(store)
const { userInfo } = storeToRefs(userInfoStore)
const userAuth = ref('')
const initUserAuth = () => {
    userAuth.value = userInfo.value.roles[0]
}
const authChange = async () => {
    userInfo.value.userName = userAuth.value
    userInfo.value.roles = []
    await frontEndRoutes()
}

onMounted(() => {
    initUserAuth()
})

</script>

<style scoped></style>