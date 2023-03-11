import type { App } from "vue";
import { authDirective } from "./auth";

/**
 * 注册指令入口
 * @param app 
 */
export const directive = (app: App) => {
    // 按钮权限
    authDirective(app)
}