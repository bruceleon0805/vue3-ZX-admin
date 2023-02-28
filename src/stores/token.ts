import { timestamp, timestamp2Str } from "@/utils/date";
import { defineStore } from "pinia";

/**
 * 过期时间 
 *   为时间段 如 3*3600 3小时， 当前时间 - 创建时间 > expired 为失效
 *   为时间点 如 20221151120的时间戳，当前时间 - expired > 0 为失效
 */


export const useTokenStore = defineStore('tokenStore', {
    persist: true, // 全部持久化存储
    state: () => {
        return {
            token: '',
            createTime: 0, // token创建时间 如果expired为 失效天数 需要
            createTimeStr: '',// createTime 标准格式时间 方便查看
            expired: 0 // 过期时间， 0 不过期
        }
    },
    getters: {},
    actions: {
        getValidToken() {
            // 没有设置过期时间 永久保存
            if (!this.expired) return this.token;

            const current_time = timestamp() // 当前时间
            // 无创建时间 为时间点
            if (!this.createTime && current_time - this.expired > 0) {
                this.token = ''
            }
            // 时间段
            if (this.createTime && current_time - this.createTime > this.expired) {
                this.token = ''
            }
            return this.token
        },
        setToken(token: string) {
            this.token = token
        },
        setExpired(expired_time: number) {
            /**
             * 设置过期时间  秒
             * 根据 expired_time 是否为时间戳判断 时间点 或 时间段
             */
            if (expired_time.toString().length >= 10) {
                this.createTime = 0 // 时间点
            } else {
                this.createTime = timestamp() // 时间段
                this.createTimeStr = timestamp2Str(this.createTime)
            }
            this.expired = expired_time
        }
    }
})


