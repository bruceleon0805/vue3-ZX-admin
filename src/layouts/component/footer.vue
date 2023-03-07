<template>
    <el-footer>
        Footer
        <i-ep-arrow-right />
        <i-mdi-account />
        
        <el-icon>
            <component :is="icon"></component>
        </el-icon>
    
    </el-footer>
</template>

<script setup lang="ts">
const icon = 'i-ep-search'

</script>

<style scoped>

</style>