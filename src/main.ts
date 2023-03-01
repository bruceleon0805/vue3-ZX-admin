import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

//icon 相关
import { useIcon } from './utils/icon'

//自定义样式
import './theme/index.scss'

// 引入 iconfont， 已在组件中单独引用
//import './assets/iconfont/iconfont.css'


import { pinia } from './stores'

const app = createApp(App)

app.use(pinia)
app.use(router)

//useIcon.ePlus(app) // 使用element-plus icon ,vite 开启自动导入就不需要
useIcon.iconfont(app) // 全局导入， 可以使用 iconfont 组件

app.mount('#app')
