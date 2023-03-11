
/**
 *  按钮权限验证
 */

import { store } from "@/stores"
import { useUserInfoStore } from "@/stores/userInfo"

/**
 * 单个权限
 */
export const auth = (data: string) => {
    const userInfoStore = useUserInfoStore(store)
    return userInfoStore.userInfo.btnActionList.some(v => v === data)
}

/**
 * 多个权限，满足其一
 */
export const auths = (data: string[]) => {
    const userInfoStore = useUserInfoStore(store)
    let flag = false;
    userInfoStore.userInfo.btnActionList.map(btnAuth => {
        data.map(v => {
            if (btnAuth === v) flag = true;
        })
    })
    return flag
}

/**
 * 多个权限，全部满足
 * @param data 
 * @returns boolean
 */
export const authAll = (data: string[]) => {
    const userInfoStore = useUserInfoStore(store)
    return userInfoStore.userInfo.btnActionList.sort().toString() === data.sort().toString()
}