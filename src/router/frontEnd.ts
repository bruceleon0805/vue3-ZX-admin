import { pinia } from "@/stores"
import { useMenuRoutesStore } from "@/stores/menuRoutes"
import { useTagsRoutesStore } from "@/stores/tagsRoutes"
import { useTokenStore } from "@/stores/token"
import { useUserInfoStore } from "@/stores/userInfo"
import { storeToRefs } from "pinia"
import type { RouteRecordRaw } from "vue-router"
import router from "./index"
import { dynamicRoutes, errorRoutes } from "./route"



/**
 * 前端路由
 */
export const frontEndRoutes = async () => {
    const tokenStore = useTokenStore(pinia)
    const { token } = storeToRefs(tokenStore)
    // 没有token 返回
    if (!token.value) return true;

    // 获取用户信息
    const userInfoStore = useUserInfoStore(pinia)
    await userInfoStore.setUserInfo()
    const { userInfo } = storeToRefs(userInfoStore)

    // roles不存在 权限不存在
    if (userInfo.value.roles.length === 0) return Promise.resolve(true)

    // 动态添加路由
    await addDynamicRoutes()

    // 缓存 有权限且没有开启隐藏的 menu 
    cacheMenu()

    // 缓存 有权限且没有开启隐藏的 tags Routes
    await cacheTags()


}

/**
 * 动态添加路由
 */
const addDynamicRoutes = async () => {
    /**
     * 核心
     * 1 把children提出
     * 2 过滤根节点下没有权限的路由

     * 1 扁平化处理成一维数组
     * 2 处理成二级数组
     * 3 权限 roles 处理
     * 4 处理后的有权限的路由数组
     */
    // 1 扁平化处理成一维数组
    const flatRoutes = formatFlatteningRoutes(dynamicRoutes)
    // 2 处理成二级数组
    const twoStageRoutes = formatTwoStageRoutes(flatRoutes)
    // 3 权限 roles 处理
    const filterAuth = filterAuthRoutes(twoStageRoutes[0].children)
    // 4 处理后的有权限的路由数组 
    // 获取有当前用户权限标识的路由数组，进行对原路由的替换
    twoStageRoutes[0].children = [...filterAuth, ...errorRoutes];

    await twoStageRoutes.forEach((route: RouteRecordRaw) => {
        router.addRoute(route)
    });
}


/**
 * 路由多级嵌套数组处理成一维数组
 * @param arr 传入路由菜单数据数组
 * @returns 返回处理后的一维路由菜单数组
 */
export function formatFlatteningRoutes(arr: any) {
    if (arr.length <= 0) return false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].children) {
            arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1));
        }
    }
    return arr;
}


/**
 * 一维数组处理成多级嵌套数组（只保留二级：也就是二级以上全部处理成只有二级，keep-alive 支持二级缓存）
 * @description isKeepAlive 处理 `name` 值，进行缓存。顶级关闭，全部不缓存
 * @link 参考：https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive
 * @param arr 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成 `定义动态路由（dynamicRoutes）` 的格式
 */
const formatTwoStageRoutes = (arr: any) => {
    if (arr.length <= 0) return false;
    const newArr: any = [];
    const cacheList: Array<string> = [];
    arr.forEach((v: any) => {
        if (v.path === '/') {
            newArr.push({ component: v.component, name: v.name, path: v.path, redirect: v.redirect, meta: v.meta, children: [] });
        } else {
            // 判断是否是动态路由（xx/:id/:name），用于 tagsView 等中使用
            // 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
            if (v.path.includes('/:')) {
                //v.meta['isDynamic'] = true;
                //v.meta['isDynamicPath'] = v.path;
            }
            newArr[0].children.push({ ...v });

            // 存 name 值，keep-alive 中 include 使用，实现路由的缓存
            // 路径：/@/layout/routerView/parent.vue
            if (newArr[0].meta?.keepAlive && v.meta?.keepAlive) {
                cacheList.push(v.name);
                //const stores = useKeepALiveNames(pinia);
                //stores.setCacheKeepAlive(cacheList);
            }
        }
    });
    return newArr;
}



/**
 * 获取当前用户权限标识去比对路由表（未处理成多级嵌套路由）
 * 获取有权限的路由
 * @description 这里主要用于动态路由的添加，router.addRoute
 * @link 参考：https://next.router.vuejs.org/zh/api/#addroute
 * @param children dynamicRoutes（/@/router/route）第一个顶级 children 的下路由集合
 * @returns 返回有当前用户权限标识的路由数组
 */
const filterAuthRoutes = (children: Array<RouteRecordRaw>) => {
    const userInfoStore = useUserInfoStore(pinia)
    const { userInfo } = storeToRefs(userInfoStore);
    let filterRoute: any = [];
    children.forEach((route: any) => {
        if (route.meta?.roles) {
            route.meta.roles.forEach((metaRoles: any) => {
                userInfo.value.roles.forEach((roles: any) => {
                    if (metaRoles === roles) filterRoute.push({ ...route });
                });
            });
        }
    });
    return filterRoute;
}


/**
 * 判断路由 `meta.roles` 中是否包含当前登录用户权限字段
 * 用户权限roles 是否存在于route.meta.roles
 * @param roles 用户权限标识，在 userInfos（用户信息）的 roles（登录页登录时缓存到浏览器）数组
 * @param route 当前循环时的路由项
 * @returns 返回对比后有权限的路由项
 */
const hasRoles = (roles: string[], route: { meta: { roles: string[] } }) => {
    if (route.meta && route.meta.roles) return roles.some((role: string) => route.meta.roles.includes(role));
    else return true; // 路由没有roles表示不限制权限
}


/**
 * 获取当前用户权限标识去比对路由表，设置递归过滤有权限的路由
 * @param routes 当前路由 children
 * @param roles 用户权限标识，在 userInfos（用户信息）的 roles（登录页登录时缓存到浏览器）数组
 * @returns 返回有权限的路由数组 `meta.roles` 中控制
 */
const hasRolesMenu = (routes: any, roles: any) => {
    const menu: RouteRecordRaw[] = [];
    routes.forEach((route: RouteRecordRaw) => {
        const item = { ...route };
        if (hasRoles(roles, item as any)) {
            //继续判断子节点
            if (item.children) item.children = hasRolesMenu(item.children, roles);

            menu.push(item);
        }
    });
    return menu;
}


/**
 * 设置递归过滤有权限的路由到 pinia routes 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 * @description 用于左侧菜单、横向菜单的显示
 * @description 用于 tagsView、菜单搜索中：未过滤隐藏的(isHide)
 */
export function cacheMenu() {
    const userInfoStore = useUserInfoStore(pinia);
    const mnueRoutesStore = useMenuRoutesStore(pinia);
    const { userInfo } = storeToRefs(userInfoStore);

    const menuRoutes = hasRolesMenu(dynamicRoutes[0].children, userInfo.value.roles)

    // 过滤 路由隐藏的项 meta.hidden=true
    const filterHidden = filterHiddenMenu(menuRoutes)

    mnueRoutesStore.setRoutes(filterHidden);
}
/**
 * 过滤隐藏的 路由
 * @param menuRoutes 
 * @returns 没有隐藏的路由
 */
const filterHiddenMenu = (menuRoutes: RouteRecordRaw[]) => {
    return menuRoutes.filter((item) => !item.meta?.hidden).map((it) => {
        it = Object.assign({}, it)
        if (it.children) {
            it.children = filterHiddenMenu(it.children)
        }
        return it
    })
}


/**
 * 缓存多级嵌套数组处理后的一维数组
 * @description 用于 tagsView、菜单搜索中：未过滤隐藏的(isHide)
 */
const cacheTags = async () => {
    // 获取有权限的路由，否则 tagsView、菜单搜索中无权限的路由也将显示
    const userInfoStore = useUserInfoStore(pinia);
    const tagsRoutesStore = useTagsRoutesStore(pinia);
    const { userInfo } = storeToRefs(userInfoStore);

    //过滤掉没有有权限 mete.roles 不在用户权限标识内的
    const rolesRoutes = hasRolesMenu(dynamicRoutes, userInfo.value.roles);
    // 扁平化处理
    const twoStageRoutes = formatTwoStageRoutes(formatFlatteningRoutes(rolesRoutes))

    //过滤已经隐藏的菜单 mete.hidden===true
    const filterHidden = filterHiddenMenu(twoStageRoutes[0].children)
    
    // 保存到 pinia setTagsRoutes 中
    tagsRoutesStore.setTagsRoutes(filterHidden);
}





