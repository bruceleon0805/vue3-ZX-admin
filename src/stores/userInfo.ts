/**
 * 用户信息
 */

import { defineStore } from "pinia";
import type { UserState } from './userInfo.d'

export const useUserInfoStore = defineStore('userInfoStore', {
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
                                ? 'https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500'
                                : 'https://img2.baidu.com/it/u=2370931438,70387529&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
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
