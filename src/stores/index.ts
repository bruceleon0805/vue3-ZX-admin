/**
 * pinia 创建 及 持久化
 */
import { createPinia } from "pinia";
// 持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { App } from "vue";

export const store = createPinia()

store.use(piniaPluginPersistedstate)

export const setupStore = (app: App) => {
    app.use(store)
}



