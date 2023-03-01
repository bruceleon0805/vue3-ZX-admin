<template>
    <span class="iconfont" :class="iconTag"></span>
</template>

<script setup lang="ts" name="iconfont">
// iconfont css
import '@/assets/iconfont/iconfont.css'

import type { Color } from 'csstype';

import { computed, toRefs } from 'vue';

/**
 * 对iconfont进行封装 font-class
 */
interface Props {
    name: string,
    prefix?: string,
    size?: number,
    color?: Color
}
const props = withDefaults(defineProps<Props>(), {
    prefix: 'icon-',
    size: 16
})
/**
 * https://cn.vuejs.org/api/reactivity-utilities.html#torefs
 * 官网提示 属性可能不存在 不建议使用
 * toRefs 在调用时只会为源对象上可以枚举的属性创建 ref。如果要为可能还不存在的属性创建 ref，请改用 toRef。
 */
const { name, prefix, size, color } = toRefs(props)

/**
 * 添加前缀 icon-
 */
const iconTag = computed(() => name.value.includes(prefix.value) ? name.value : prefix.value + name.value)

// px
const sizeUnit = computed(() => size.value + 'px')

</script>

<style lang="scss" scoped>
.iconfont {
    font-size: v-bind(sizeUnit);
    color: v-bind(color);
}
</style>
