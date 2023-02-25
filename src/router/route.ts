
//静态路由
export const staticRoutes = [

]


//动态路由
export const dynamicRoutes = [

]

export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/layouts/basic.vue')
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue')
    }
]