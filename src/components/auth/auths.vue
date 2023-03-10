<template>
    <slot v-if="getButtonAuth" />
</template>

<script setup lang="ts" name="auths">
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
判断 权限数组 authList 是否存在于 btnActionList中
*/
const getButtonAuth = computed(() => {
    let flag = false;
    userInfo.value.btnActionList.map((btnAuth: string) => {
        props.data.map(auth => {
            if (btnAuth === auth) flag = true
        })
    })
    return flag;
})
</script>

<style scoped></style>