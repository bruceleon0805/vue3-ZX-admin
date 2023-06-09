import { createApp } from 'vue'

import App from './App.vue'
import { setupRouter } from './router'

//icon 相关
//import { useIcon } from './utils/icon'

//自定义样式
import './theme/index.scss'

// 引入 iconfont， 已在组件中单独引用
//import './assets/iconfont/iconfont.css'

/* 
element-plus 样式
*/
import 'element-plus/dist/index.css'


import { setupStore } from './stores'
import { setupI18n } from './i18n'
import { setupIcon } from './plugins/icon'
import { directive } from './directive'

const appInit = async () => {
    const app = createApp(App)
    // 注册指令
    directive(app)
    
    await setupI18n(app)
    // pinia
    setupStore(app)
    
    setupRouter(app)

    /* 
        icon 设置 动态组件引用icon 
        支持 element-plus icon 与 iconfont
        非 动态component使用动态导入 vite.config.ts => IconsResolver
    */
    setupIcon(app)

    //useIcon.ePlus(app) // 使用element-plus icon ,vite 开启自动导入就不需要
    //useIcon.iconfont(app) // 全局导入， 可以使用 iconfont 组件

    app.mount('#app')
}

appInit()
