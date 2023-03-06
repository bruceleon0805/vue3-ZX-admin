<template>
    <div class="user pr15">
        <el-dropdown trigger="click" @command="componentSizeChange">
            <div class="user-icon">
                <Iconfont name="icon_zitidaxiao" title="字体大小" />
            </div>
            <template #dropdown>
                <el-dropdown-item command="large" :disabled="componentSize === 'large'">
                    大
                </el-dropdown-item>
                <el-dropdown-item command="default" :disabled="componentSize === 'default'">
                    默认
                </el-dropdown-item>
                <el-dropdown-item command="small" :disabled="componentSize === 'small'">
                    小
                </el-dropdown-item>
            </template>
        </el-dropdown>

        <el-dropdown trigger="click" @command="languageChange">
            <div class="user-icon">
                <Iconfont name="zhongyingwen2zhongwen" title="语言" />
            </div>
            <template #dropdown>
                <el-dropdown-item command="zh-CN" :disabled="local === 'zh-CN'">
                    简体中文
                </el-dropdown-item>
                <el-dropdown-item command="en" :disabled="local === 'en'">
                    English
                </el-dropdown-item>
            </template>
        </el-dropdown>

        <div class="user-icon" @click="searchClick">
            <el-icon title="搜索">
                <i-ep-search></i-ep-search>
            </el-icon>
        </div>

        <div class="user-icon" @click="layoutSetting">
            <el-icon title="布局配置">
                <Iconfont name="color" />
            </el-icon>
        </div>

        <div class="user-icon">
            <el-popover placement="bottom" trigger="click" transition="el-zoom-in-top" :width="300" :persistent="false">
                <template #reference>
                    <el-badge is-dot>
                        <i-ep-bell></i-ep-bell>
                    </el-badge>
                </template>
                <template #default>
                    <UserNews />
                </template>
            </el-popover>
        </div>
        <!-- <div class="user-icon mr10" @click="fullscreenClick">
            <el-icon title="全屏"><i-ep-full-screen /></el-icon>
        </div> -->

        <el-dropdown @command="dropdownClick">
            <span class="user-link">
                <img :src="userInfo.avatar" alt="头像" class="user-link-photo mr5">
                admin
                <el-icon class="el-icon--right">
                    <i-ep-arrow-down></i-ep-arrow-down>
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="/home">
                        首页
                    </el-dropdown-item>
                    <el-dropdown-item command="/personal">
                        个人中心
                    </el-dropdown-item>
                    <el-dropdown-item divided command="logout">
                        退出登录
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>



        </el-dropdown>

        <Search ref="searchRef" />
    </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { useTokenStore } from '@/stores/token';
import { useUserInfoStore } from '@/stores/userInfo';
import { ElMessageBox } from 'element-plus';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent, inject, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import type { componentSize } from '@/stores/theme.d'
import { I18N, useGlobalStoreWithOut } from '@/stores/global';

const tokenStore = useTokenStore()
const router = useRouter()
const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)

const themeStore = useThemeStore()
const { componentSize } = storeToRefs(themeStore)

const UserNews = defineAsyncComponent(() => import('@/layouts/component/header/userNews.vue'))
const Search = defineAsyncComponent(() => import('@/layouts/component/header/search.vue'))

const globalStore = useGlobalStoreWithOut()
const { local } = storeToRefs(globalStore)

const searchRef = ref()

// flex num
const flex = '1'

/**
 * 组件大小设置
 */
const componentSizeChange = (size: componentSize) => {
    componentSize.value = size
    window.location.reload()
}
/**
 * 语言切换
 */
const languageChange = (local: I18N) => {
    globalStore.setCurrentLocal(local)
}
/* 
搜索
 */
const searchClick = () => {
    searchRef.value.openSearch()
}

const SettingDrawerRef: Ref = inject('SettingDrawerRef') as Ref
/* 布局配置
 */
const layoutSetting = () => {
    SettingDrawerRef.value.openDrawer()
}

/* 全屏 */
const fullscreenClick = () => {

}

/* 下拉选项点击 */
const dropdownClick = (command: string) => {
    if (command === 'logout') {
        ElMessageBox({
            closeOnClickModal: false,
            closeOnPressEscape: false,
            title: '提示',
            message: '此操作将退出登录, 是否继续?',
            showCancelButton: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            buttonSize: 'default',
            beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                    instance.confirmButtonLoading = true;
                    instance.confirmButtonText = '退出中'
                    setTimeout(() => {
                        done()
                        setTimeout(() => {
                            instance.confirmButtonLoading = false
                        }, 300);

                    }, 700);
                } else {
                    done()
                }

            }
        }).then(async () => {
            /* 
            删除token
            用户信息
            */
            tokenStore.setToken('')
            router.push('/login')
        })
    } else {
        router.push(command)
    }
}




</script>

<style scoped lang="scss">
.el-badge {
    display: flex !important;
}

.user {
    display: flex;
    flex: v-bind(flex);
    align-items: center;
    justify-content: flex-end;

    &-link {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        &-photo {
            width: 25px;
            height: 25px;
            border-radius: 100%;
        }
    }

    &-icon {
        padding: 0 10px;
        cursor: pointer;
        //color: var(--next-bg-topBarColor);
        height: 50px;
        line-height: 50px;
        display: flex;
        align-items: center;

        &:hover {
            background-color: var(--next-color-user-hover);

            i {
                display: inline-block;
                animation: logoAnimation 0.3s ease-in-out;
            }
        }


    }

    /*  :deep(.el-dropdown) {
		color: var(--next-bg-topBarColor);
	}
	:deep(.el-badge) {
		height: 40px;
		line-height: 40px;
		display: flex;
		align-items: center;
	}
	:deep(.el-badge__content.is-fixed) {
		top: 12px;
	} */


}
</style>