<template>
  <div class="layout-container">
    <el-container>
      <LayoutAside />
      <el-container>
        <el-header style="background-color: blue;">Header</el-header>
        <el-main style="background-color: white;">Main
          <el-input placeholder="搜索文本框">
            <template #prefix>
              <el-icon>
                <component :is="iconPlus"></component>
              </el-icon>
            </template>
        </el-input>
        
        </el-main>
        <el-footer style="background-color: purple;">Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const iconPlus = 'plus'


const LayoutAside = defineAsyncComponent(() => import('@/layouts/component/aside.vue'))

</script>

<style lang="scss" scoped></style>