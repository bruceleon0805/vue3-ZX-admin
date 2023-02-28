import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import { useIcon } from './utils/icon'

//自定义样式
import './theme/index.scss'
import { pinia } from './stores'

const app = createApp(App)

app.use(pinia)
app.use(router)

useIcon.ePlus(app) // 使用element-plus icon

app.mount('#app')
