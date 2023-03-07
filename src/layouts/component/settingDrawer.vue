<template>
    <div class="setting-drawer">
        <el-drawer v-model="state.open" direction="rtl" destroy-on-close :size="260" @close="drawerClose">
            <el-scrollbar class="drawer-scrollbar">
                <el-divider content-position="left">布局配置</el-divider>
                <div class="global-theme">
                    <div class="global-theme-label">
                        primary
                    </div>
                    <div class="global-theme-value">
                        <el-color-picker v-model="primary" size="default" @change="colorPickerChange"></el-color-picker>
                    </div>
                </div>

                <div class="dark-mode">
                    <div class="dark-model-label">
                        深色模式
                    </div>
                    <div class="dark-model-value">
                        <el-switch size="small" v-model="isDark" @change="darkChange"></el-switch>
                    </div>
                </div>

            </el-scrollbar>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import { store } from '@/stores';
import { useThemeStore } from '@/stores/theme';

/* 
切换dark mode
*/
import { useDark, useToggle } from '@vueuse/core'
import { storeToRefs } from 'pinia';

const isDark = useDark()
const toggleDark = useToggle(isDark)
/* 主题 */
const themeStore = useThemeStore(store)
const { primary } = storeToRefs(themeStore)



const state = reactive({
    open: false
})

const openDrawer = () => {
    state.open = true
}
const drawerClose = () => {

}

/* 
primary 颜色选择
*/
const colorPickerChange = () => {
    console.log(primary.value);
    if (!primary.value) return ElMessage.warning('主题颜色 primary 不能为空')
    document.documentElement.style.setProperty('--el-color-primary', primary.value)
}

const darkChange = () => {
    toggleDark(isDark.value)
}

defineExpose({
    openDrawer
})



</script>

<style lang="scss" scoped>
.drawer-scrollbar {
    height: calc(100vh - 50px);
    padding: 0 15px;

    :deep(.el-scrollbar__view) {
        overflow-x: hidden;
    }

    .global-theme {
        display: flex;
        align-items: center;
        margin-bottom: 5px;

        &-label {
            flex: 1;
            color: var(--el-text-color-primary);
        }
    }

    .dark-mode {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

}
</style>