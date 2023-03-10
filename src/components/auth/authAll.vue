<template>
    <slot v-if="getButtonAuth" />
</template>

<script setup lang="ts" name="authAll">
import { store } from '@/stores';
import { useUserInfoStore } from '@/stores/userInfo';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

interface Props {
    data: string[]
}
const props = withDefaults(defineProps<Props>(), {
    data: () => []
})

const userInfoStore = useUserInfoStore(store)
const { userInfo } = storeToRefs(userInfoStore)

/* 
判断 两个一维数组是否相等
*/
const getButtonAuth = computed(() => {
    return userInfo.value.btnActionList.sort().toString() === props.data.sort().toString()
})
</script>

<style scoped></style>