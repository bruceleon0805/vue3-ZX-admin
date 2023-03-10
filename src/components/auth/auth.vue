<template>
    <slot v-if="getButtonAuth"></slot>
</template>

<script setup lang="ts" name="auth">
import { store } from '@/stores';
import { useUserInfoStore } from '@/stores/userInfo';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

interface Props {
    data: string
}
const props = withDefaults(defineProps<Props>(), {
    data: ''
})

const userInfoStore = useUserInfoStore(store)
const { userInfo } = storeToRefs(userInfoStore)
const getButtonAuth = computed(() => userInfo.value.btnActionList.some((v: string) => v === props.data))

</script>