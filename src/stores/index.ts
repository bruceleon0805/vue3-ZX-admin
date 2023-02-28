/**
 * pinia 创建 及 持久化
 */
import { createPinia } from "pinia";

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


export const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

