<template>
  <div class="layout-container">
    <el-container>
      <LayoutAside />
      <el-container direction="vertical">
        <!-- 头部 -->
        <LayoutHeader />
          <!-- 内容         -->
        <LayoutMain />
        <LayoutFooter />
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const LayoutAside = defineAsyncComponent(() => import('@/layouts/component/aside.vue'))
const LayoutHeader = defineAsyncComponent(() => import('@/layouts/component/header.vue'))
const LayoutFooter = defineAsyncComponent(() => import('@/layouts/component/footer.vue'))
const LayoutMain = defineAsyncComponent(() => import('@/layouts/component/main.vue'))


</script>

<style lang="scss" scoped></style>