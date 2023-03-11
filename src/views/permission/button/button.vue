<template>
    <div class="layout-content">
        <PermissionPage />
        <el-card shadow="hover" header="组件方式">
            <el-row>单个权限验证</el-row>
            <el-row>
                <Auth :data="'btn.add'">
                    <el-button type="primary">
                        <Icon name="ep-DocumentAdd" />
                        新增
                    </el-button>
                </Auth>
                <Auth :data="'btn.edit'">
                    <el-button type="info">
                        <Icon name="ep-Edit" />
                        编辑
                    </el-button>
                </Auth>
                <Auth :data="'btn.del'">
                    <el-button type="danger">
                        <Icon name="ep-Delete" />
                        删除
                    </el-button>
                </Auth>
                <Auth :data="'btn.link'">
                    <el-button type="success">
                        <Icon name="ep-Link" />
                        跳转
                    </el-button>
                </Auth>
            </el-row>
            <el-row>多个权限验证，满足其一</el-row>
            <el-row>
                <Auths :data="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                    <el-button type="primary" size="default">
                        <Icon name="ep-DocumentAdd" />
                        新增
                    </el-button>
                </Auths>
                <Auths :data="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                    <el-button type="info" size="default">
                        <Icon name="ep-Edit" />
                        编辑
                    </el-button>
                </Auths>
                <Auths :data="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                    <el-button type="danger" size="default">
                        <Icon name="ep-Delete" />
                        删除
                    </el-button>
                </Auths>
                <Auths :data="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                    <el-button type="success" size="default">
                        <Icon name="ep-Link" />
                        跳转
                    </el-button>
                </Auths>
            </el-row>
            <el-row>
                多个权限，满足其一
            </el-row>
            <el-row>
                <AuthAll :data="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                    <el-button type="primary" size="default">
                        <i-ep-document-add />
                        新增
                    </el-button>
                </AuthAll>
                <AuthAll :data="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                    <el-button type="info" size="default">
                        <i-ep-edit />
                        编辑
                    </el-button>
                </AuthAll>
                <AuthAll :data="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                    <el-button type="danger" size="default">
                        <i-ep-delete />
                        删除
                    </el-button>
                </AuthAll>
                <AuthAll :data="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                    <el-button type="success" size="default">
                        <i-ep-link />
                        删除
                    </el-button>
                </AuthAll>
            </el-row>
        </el-card>
        <el-card shadow="hover" header="演示：指令方式">
            <el-row>单个权限验证 v-auth='xxx'</el-row>
            <el-row>
                <el-button v-auth="'btn.add'" type="primary" size="default">
                    <i-ep-document-add />
                    添加
                </el-button>
                <el-button v-auth="'btn.edit'" type="info" size="default">
                    <i-ep-edit />
                    编辑
                </el-button>

                <el-button v-auth="'btn.del'" type="danger" size="default">
                    <i-ep-delete />
                    删除
                </el-button>
                <el-button v-auth="'btn.link'" type="success" size="default">
                    <i-ep-link />
                    跳转
                </el-button>

            </el-row>
            <el-row>
                多个权限，满足其一
            </el-row>
            <el-row>
                <el-button v-auths="['btn.add', 'btn.edit', 'btn.del', 'btn.link']" type="primary" size="default">
                    <i-ep-document-add />
                    新增
                </el-button>
                <el-button v-auths="['btn.add', 'btn.edit', 'btn.del', 'btn.link']" type="info" size="default">
                    <i-ep-edit />
                    编辑
                </el-button>
                <el-button v-auths="['btn.add', 'btn.edit', 'btn.del', 'btn.link']" type="danger" size="default">
                    <i-ep-delete />
                    删除
                </el-button>
                <el-button v-auths="['btn.add', 'btn.edit', 'btn.del', 'btn.link']" type="success" size="default">
                    <i-ep-link />
                    跳转
                </el-button>
            </el-row>

            <el-row>
                多个权限，全部满足
            </el-row>
            <el-row>
                <el-button type="primary" size="default" v-auth="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                    <i-ep-document-add />
                    新增
                </el-button>
                <el-button type="info" size="default" v-auth="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                    <i-ep-edit />
                    编辑
                </el-button>
                <el-button type="danger" size="default" v-auth="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                    <i-ep-delete />
                    删除
                </el-button>
                <el-button type="success" size="default" v-auth="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
                    <i-ep-link />
                    跳转
                </el-button>
            </el-row>
        </el-card>
        <el-card shadow="hover" header="演示：函数方式">
            <el-row>
                auth
            </el-row>
            <el-row>
                <el-button @click="authClick" type="primary" size="default">
                    <i-ep-document-add />
                    新增
                </el-button>

                <el-button @click="authsClick" type="info" size="default">
                    <i-ep-edit />
                    编辑
                </el-button>

                <el-button @click="authAllClick" type="danger" size="default">
                    <i-ep-delete />
                    删除
                </el-button>
            </el-row>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { auth, authAll, auths } from '@/utils/authFunc';
import { defineAsyncComponent } from 'vue';


const PermissionPage = defineAsyncComponent(() => import('@/views/permission/page/page.vue'))

const Auth = defineAsyncComponent(() => import('@/components/auth/auth.vue'))
const AuthAll = defineAsyncComponent(() => import('@/components/auth/authAll.vue'))
const Auths = defineAsyncComponent(() => import('@/components/auth/auths.vue'))

const authClick = () => {
    if (!auth('btn.add')) ElMessage.error('您没有权限')
    else ElMessage.success('您有权限')
}

const authsClick = () => {
    if (!auths(['btn.add', 'btn.edit', 'btn.del', 'btn.link'])) ElMessage.error('您没有权限')
    else ElMessage.success('您有权限')
}

const authAllClick = () => {
    if (!authAll(['btn.add', 'btn.edit', 'btn.del', 'btn.link'])) ElMessage.error('您没有权限')
    else ElMessage.success('您有权限')
}


</script>

<style scoped></style>