/**
 * 路由meta的参数
 */
export interface RouteMeta {
    title?: string, //
    icon?: string, // icon图标
    roles?: string[], // 权限标识
    isFixed?: boolean, // 是否固定显示
    keepAlive?: boolean, // 是否缓存
    hidden?: boolean, // 是否显示
}