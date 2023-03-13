/**
 * 用户信息
 */

import { defineStore } from "pinia";
import type { UserState } from './userInfo.d'

export const useUserInfoStore = defineStore('userInfoStore', {
    persist:{
        paths:['userInfo.userName']
    },
    state: (): UserState => {
        return {
            userInfo: {
                userName: '',
                avatar: '',
                roles: [],
                btnActionList: []
            }
        }
    },
    actions: {
        async setUserInfo() {
            /**
             * 保存用户信息
             */
            if (this.userInfo.roles.length !== 0) {
                // 用户信息已存在
                return this.userInfo
            } else {
                // 请求获取
                const data: any = await this.getUserInfo()
                this.userInfo = data
            }
        },
        async getUserInfo() {
            return new Promise((resolve) => {
                /**
                 * 模拟返回数据
                 */
                setTimeout(() => {
                    const userName = this.userInfo.userName
                    const roles = userName == 'admin' ? ['admin'] : ['common']
                    const btnActionList = userName == 'admin' ? ['btn.add', 'btn.del', 'btn.edit', 'btn.link'] : ['btn.add', 'btn.link']
                    const userInfos = {
                        userName: userName,
                        avatar:
                            userName === 'admin'
                                ? 'https://upload-bbs.mihoyo.com/upload/2021/07/05/181022726/a23d0da75d32f10428ffa0e8cc53932e_7261091149645338367.jpg'
                                : 'https://upload-bbs.mihoyo.com/upload/2021/06/06/2453171/f5893e1aec7f1ca080a6110e608f35f4_6500189115909432998.jpg',
                        time: new Date().getTime(),
                        roles: roles,
                        btnActionList: btnActionList
                    };
                    resolve(userInfos);
                }, 500);
            })
        }
    }
})
