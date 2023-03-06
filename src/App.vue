<template>
  <el-config-provider :locale="currentLocal" :size="size">
    <router-view></router-view>
    <SettingDrawer ref="SettingDrawerRef" />
  </el-config-provider>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, defineAsyncComponent, inject, provide, ref } from 'vue';
import { useGlobalStoreWithOut } from './stores/global';
import { useThemeStore } from './stores/theme';

const SettingDrawer = defineAsyncComponent(() => import('@/layouts/component/settingDrawer.vue'))
const SettingDrawerRef = ref()
provide('SettingDrawerRef', SettingDrawerRef)




/* 
语言
*/
const globalStore = useGlobalStoreWithOut()
const currentLocal = computed(() => globalStore.elLocal)



/* 组件大小 */
const themeStore = useThemeStore()
const { componentSize } = storeToRefs(themeStore)
const size = computed(() => componentSize.value)

</script>