
import type { RouteRecordRaw } from 'vue-router'

/**
 * 静态路由
 */

export const staticRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue')

    }
]

/**
 * 提示错误路由
 */
export const errorRoutes: RouteRecordRaw[] = [
    {
        path: '/:path(.*)*',
        name: 'notFound',
        component: () => import('@/views/error/404.vue')
    },
    {
        path: '/401',
        name: 'noAuth',
        component: () => import('@/views/error/401.vue')
    },

]


/**
 * 动态路由
 */
export const dynamicRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'root',
        component: () => import('@/layouts/basic.vue'),
        redirect: '/dashboard',
        children: [
            {

                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    isFixed: true, //固定显示在tags中
                    title: 'Dashboard',
                    icon: 'ep-Odometer',
                    roles: ['admin', 'common']
                },
                component: () => import('@/views/dashboard/dashboard.vue')
            },
            {
                path: '/system',
                name: 'System',
                redirect: '/system/menu',
                meta: {
                    title: '系统管理',
                    icon: 'ep-Setting',
                    roles: ['admin','common']
                },
                children: [
                    {
                        path: '/system/menu',
                        name: 'SystemMenu',
                        meta: {
                            title: '菜单管理',
                            icon: 'ep-Menu',
                            roles: ['admin','common']
                        },
                        component: () => import('@/views/system/menu/menu.vue')
                    },
                    {
                        path: '/system/roles',
                        name: 'SystemRoles',
                        meta: {
                            title: '角色管理',
                            icon: 'ep-Menu',
                            roles: ['admin','common']
                        },
                        component: () => import('@/views/system/roles/roles.vue')
                    },
                    {
                        path: '/system/user',
                        name: 'SystemUser',
                        meta: {
                            title: '用户管理',
                            icon: 'ep-Menu',
                            roles: ['admin','common']
                        },
                        component: () => import('@/views/system/user/user.vue')
                    }
                    ,
                    {
                        path: '/system/department',
                        name: 'SystemDepartment',
                        meta: {
                            title: '部门管理',
                            icon: 'ep-Menu',
                            roles: ['admin','common']
                        },
                        component: () => import('@/views/system/department/department.vue')
                    }
                ]
            },
            {

                path: '/hidden',
                name: 'hidden',
                meta: {
                    hidden: true,
                    title: 'hidden',
                    icon: 'ep-Odometer',
                    roles: ['admin', 'common']
                },
                component: () => import('@/views/dashboard/dashboard.vue')
            },
            {

                path: '/permission',
                name: 'permission',
                meta: {
                    title: '权限控制',
                    icon: 'ep-Setting',
                    roles: ['admin', 'common']
                },
                redirect: '/permission/page',
                children: [
                    {
                        path: '/permission/page',
                        name: 'permissionPage',
                        meta: {
                            title: '页面控制',
                            icon: 'ep-Setting',
                            roles: ['admin', 'common']
                        },
                        component: () => import('@/views/permission/page/page.vue'),
                    },
                    {
                        path: '/permission/button',
                        name: 'permissionButton',
                        meta: {
                            title: '按钮控制',
                            icon: 'ep-Setting',
                            roles: ['admin', 'common']
                        },
                        component: () => import('@/views/permission/button/button.vue'),
                    }
                ]
            },
            {
                path: '/menu',
                name: 'menu',
                redirect: '/menu/menu1',
                meta: {
                    title: 'menu',
                    icon: 'ep-Menu',
                    permissions: ['admin', 'common']
                },
                children: [
                    {
                        path: '/menu/menu1',
                        name: 'menu1',
                        meta: {
                            icon: 'ep-Menu',
                            title: 'menu1',
                            roles: ['admin', 'common']
                        },
                        component: () => import('@/views/menu/menu1/menu1.vue')
                    },
                    {
                        path: '/menu/menu2',
                        name: 'menu2',
                        meta: {
                            title: 'menu2',
                            icon: 'ep-Menu',
                            roles: ['admin', 'common']
                        },
                        redirect: '/menu/menu2/menu22',
                        children: [
                            {
                                path: '/menu/menu2/menu22',
                                name: 'menu22',
                                meta: {
                                    icon: 'ep-Menu',
                                    title: 'menu22',
                                    roles: ['admin', 'common']
                                },
                                component: () => import('@/views/menu/menu2/menu22/menu22.vue')
                            },
                            {
                                path: '/menu/menu2/menu23',
                                name: 'menu23',
                                meta: {
                                    icon: 'ep-Menu',
                                    title: 'menu23',
                                    roles: ['admin', 'common']
                                },
                                component: () => import('@/views/menu/menu2/menu22/menu22.vue')
                            }
                        ]
                    },

                ]
            }
        ]
    }

]
