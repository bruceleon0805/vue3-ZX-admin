/* 
i18n 语言设置
*/
import { pinia } from '@/stores'
import { useGlobalStore } from '@/stores/global'
import { I18N } from '@/stores/global.d'
import { createI18n } from 'vue-i18n'
const globalStore = useGlobalStore(pinia)

/*
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 * 所有 i18n 文件会一次导入
 * vite.config i18n include 参数值，
 *  对应是locales下所有文件
 */
import messages from '@intlify/unplugin-vue-i18n/messages'



export const i18n = createI18n({
    legacy: false, // 使用 Composition API 模式，则需要将其设置为false
    globalInjection: true, //全局注入 $t 函数
    locale: globalStore.i18n, //当前语言
    fallbackLocale: I18N.ZHCN, //回滚语言
    messages
})


