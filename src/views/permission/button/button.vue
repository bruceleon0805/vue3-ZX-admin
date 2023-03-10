<template>
    <div class="layout-content">
        <PermissionPage />
        <el-card shadow="hover" header="组件方式">
            <el-row>单个权限验证</el-row>
            <el-row>
                <Auth :auth="'btn.add'"> 
                    <el-button>
                        <Icon name="ep-DocumentAdd" />
                         新增
                    </el-button>
                </Auth>
                <Auth :auth="'btn.edit'"> 
                    <el-button>
                        <Icon name="ep-Edit" />
                         编辑
                    </el-button>
                </Auth>
                <Auth :auth="'btn.del'"> 
                    <el-button>
                        <Icon name="ep-Delete" />
                          删除
                    </el-button>
                </Auth>
                <Auth :auth="'btn.link'"> 
                    <el-button>
                        <Icon name="ep-Link" />
                          跳转
                    </el-button>
                </Auth>
            </el-row>
            <el-row>多个权限验证，满足其一</el-row>
            <el-row>
                
            </el-row>

        </el-card>


    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';


const PermissionPage = defineAsyncComponent(() => import('@/views/permission/page/page.vue'))

const Auth = defineAsyncComponent(() => import('@/components/auth/auth.vue'))
const AuthAll = defineAsyncComponent(() => import('@/components/auth/authAll.vue'))
const Auths = defineAsyncComponent(() => import('@/components/auth/auths.vue'))

</script>

<style scoped></style>