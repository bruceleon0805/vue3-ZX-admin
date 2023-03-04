<template>
  <el-config-provider :locale="zhCn" :size="size">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useThemeStore } from './stores/theme';
/* 组件大小 */
const themeStore = useThemeStore()
const { componentSize } = storeToRefs(themeStore)
const size = computed(() => componentSize.value)

</script>