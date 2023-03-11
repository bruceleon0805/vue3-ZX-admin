import { store } from "@/stores";
import { useUserInfoStore } from "@/stores/userInfo";
import type { App } from "vue";


/**
 * 用户按钮权限指令
 */
export const authDirective = (app: App) => {

    /**
     * 单个权限
     */
    app.directive('auth', {
        mounted(el, binding) {
            const userInfoStore = useUserInfoStore(store)
            if (!userInfoStore.userInfo.btnActionList.some(v => v === binding.value)) el.parentNode.removeChild(el)
        }
    })
    /**
     * 多个权限验证，满足其一
     */
    app.directive('auths', {
        mounted(el, binding) {
            let flag = false;
            const userInfoStore = useUserInfoStore(store)
            userInfoStore.userInfo.btnActionList.map(btnAuth => {
                binding.value.map((v: string) => {
                    if (btnAuth === v) flag = true
                })
            })
            if (!flag) el.parentNode.removeChild(el)
        }
    })
    /**
     * 全部满足
     */
    
    app.directive('auth-all',{
        mounted(el,binding){
            const userInfoStore = useUserInfoStore(store)
            if(userInfoStore.userInfo.btnActionList.sort().toString() !== binding.value.sort().toString()) el.parentNode.removeChild(el)
        }
    })


}