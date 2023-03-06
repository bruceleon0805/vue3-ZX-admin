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
                        <el-color-picker v-model="state.primary" size="default"
                            @change="colorPickerChange"></el-color-picker>
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
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';

import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)




const state = reactive({
    open: false,
    primary: '#409EFF'
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
    if (!state.primary) return ElMessage.warning('主题颜色 primary 不能为空')
    // 颜色加深
    //document.documentElement.style.setProperty('--el-color-primary-dark-2',`${}`)

    document.documentElement.style.setProperty('--el-color-primary', state.primary)

    // --el-color-primary-light- 仍需按程度调整

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
    :deep(.el-scrollbar__view){
        overflow-x: hidden;
    }
    .global-theme{
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        &-label{
           flex: 1; 
           color: var(--el-text-color-primary);
        }
    }
    .dark-mode{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

}
</style>