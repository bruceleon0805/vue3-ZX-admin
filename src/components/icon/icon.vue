<template>
    <el-icon v-if="isEP" :size="size" :color="color">
        <component :is="name"></component>
    </el-icon>
    <el-icon v-else>
        <iconfontSymbol :name="name" :size="size" :color="color" v-if="symbol" />
        <Iconfont :name="name" :size="size" :color="color" v-else />
    </el-icon>
</template>

<script setup lang="ts">
/* 
icon 动态组件
*/

import type { Color } from 'csstype';
import { computed, defineAsyncComponent } from 'vue';

const iconfontSymbol = defineAsyncComponent(() => import('./iconfontSymbol.vue'))
const Iconfont = defineAsyncComponent(() => import('./iconfont.vue'))

interface Props {
    name: string | unknown,
    size?: number,
    color?: Color,
    symbol?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    size: 16,
    symbol: false
})
/* 
判断是否 element-plus icon
*/
const isEP = computed(() => typeof props.name === 'string' && props.name.startsWith('ep-'))

</script>