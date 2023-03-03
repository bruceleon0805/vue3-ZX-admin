
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
        name: 'home',
        component: () => import('@/layouts/basic.vue'),
        redirect: '/home',
        children: [
            {

                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    isFixed: true, //固定显示在tags中
                    title: 'Dashboard',
                    icon: 'Odometer',
                    roles: ['admin', 'common']
                },
                component: () => import('@/views/dashboard/dashboard.vue')
            },
            {

                path: '/hidden',
                name: 'hidden',
                meta: {
                    hidden: true,
                    title: 'hidden',
                    icon: 'Odometer',
                    roles: ['admin', 'common']
                },
                component: () => import('@/views/dashboard/dashboard.vue')
            },
            {

                path: '/system',
                name: 'system',
                meta: {
                    title: 'System',
                    icon: 'setting',
                    roles: ['admin', 'common']
                },
                redirect: '/system/menu',
                children: [
                    {
                        path: '/system/menu',
                        name: 'systemMenu',
                        meta: {
                            title: 'System',
                            icon: 'setting',
                            roles: ['admin', 'common']
                        },
                        component: () => import('@/views/system/menu/menu.vue'),
                    }
                ]
            },
            {
                path: '/menu',
                name: 'menu',
                redirect: '/menu/menu1',
                meta: {
                    title: 'menu',
                    icon: 'Menu',
                    permissions: ['admin', 'common']
                },
                children: [
                    {
                        path: '/menu/menu1',
                        name: 'menu1',
                        meta: {
                            icon: 'menu',
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
                            icon: 'menu',
                            roles: ['admin', 'common']
                        },
                        redirect: '/menu/menu2/menu22',
                        children: [
                            {
                                path: '/menu/menu2/menu22',
                                name: 'menu22',
                                meta: {
                                    icon: 'menu',
                                    title: 'menu22',
                                    roles: ['admin', 'common']
                                },
                                component: () => import('@/views/menu/menu2/menu22/menu22.vue')
                            },
                            {
                                path: '/menu/menu2/menu23',
                                name: 'menu23',
                                meta: {
                                    icon: 'menu',
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
