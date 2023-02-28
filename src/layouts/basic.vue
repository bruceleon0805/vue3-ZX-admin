<template>
  <div class="layout-container">
    <el-container>

      <LayoutAside />

      <el-container direction="vertical">
        <!-- 头部 -->
        <LayoutHeader />
        
        <el-main style="background-color: white;">Main

          <el-button type="primary">button</el-button>
          <el-input placeholder="搜索文本框">
            <template #prefix>
              <el-icon>
                <component :is="iconPlus"></component>
              </el-icon>
            </template>
          </el-input>
        </el-main>

        <LayoutFooter />

      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const iconPlus = 'plus'


const LayoutAside = defineAsyncComponent(() => import('@/layouts/component/aside.vue'))
const LayoutHeader = defineAsyncComponent(() => import('@/layouts/component/header.vue'))
const LayoutFooter = defineAsyncComponent(() => import('@/layouts/component/footer.vue'))

</script>

<style lang="scss" scoped></style>