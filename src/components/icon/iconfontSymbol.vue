<template>
    <svg class="iconfont" aria-hidden="true">
        <use :xlink:href="'#' + name"></use>
    </svg>
</template>

<script setup lang="ts" name="iconfontSymbol">
// iconfont js
import '@/assets/iconfont/iconfont.js'
import type { Color } from 'csstype';

import { computed, toRefs } from 'vue';

/**
 * 对iconfont进行封装 symbol
 */
interface Props {
    name: string | unknown,
    size?: number,
    color?: Color
}
const props = withDefaults(defineProps<Props>(), {
    size: 16
})
/**
 * https://cn.vuejs.org/api/reactivity-utilities.html#torefs
 * 官网提示 属性可能不存在 不建议使用
 * toRefs 在调用时只会为源对象上可以枚举的属性创建 ref。如果要为可能还不存在的属性创建 ref，请改用 toRef。
 */
const { name, size, color } = toRefs(props)

// px
const sizeUnit = computed(() => size.value + 'px')

</script>

<style lang="scss" scoped>
.iconfont {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    // 自定义
    font-size: v-bind(sizeUnit);
    color: v-bind(color);
}
</style>