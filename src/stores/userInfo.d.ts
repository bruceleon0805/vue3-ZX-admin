
/**
 * 用户信息
 */
export interface UserState {
    userInfo: {
        userName: string,
        avatar: string,
        roles: string[],
        btnActionList: string[],
        [key: string]: any
    }
}