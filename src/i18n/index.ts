/* 
i18n 语言设置
*/
import { useGlobalStoreWithOut, localeMap } from '@/stores/global'

import { createI18n, type I18n } from 'vue-i18n'
import type { I18nOptions } from 'vue-i18n'
import { setHtmlPageLang } from './helper'
import type { App } from 'vue'

/* 
element-plus 语言
*/
/* import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';

const elementEl = {
    'en': en.el,
    'zh-cn': zhCn.el,
} */

/*
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 * 所有 i18n 文件会一次导入
 * vite.config i18n include 参数值，
 *  对应是locales下所有文件
 */
/* import messages from '@intlify/unplugin-vue-i18n/messages' */

/**
 * locale = zh-cn
 * 把element-plus对应的语言 zh-cn 放在 messages[zh-cn][el]
 * 
 * t（‘el.xxx'）
 * 
 */
/* Object.values(I18N).map(item => {
    if (!messages[item]['el']) {
        messages[item]['el'] = elementEl[item]
    }
}) */

export let i18n: ReturnType<typeof createI18n>

const createI18nOptions = async (): Promise<I18nOptions> => {
    const globalStore = useGlobalStoreWithOut()
    const defaultLocal = await import(`./locales/${globalStore.local}.ts`)
    const message = defaultLocal.default ?? {}

    setHtmlPageLang(globalStore.local)

    globalStore.setCurrentLocal(globalStore.local)

    return {
        legacy: false, // 使用 Composition API 模式，则需要将其设置为false
        locale: globalStore.local,
        fallbackLocale: globalStore.local, //回滚语言
        messages: {
            [globalStore.local]: message
        },
        availableLocales: localeMap.map(v => v.lang),
        sync: true,
        silentTranslationWarn: true,
        missingWarn: false,
        silentFallbackWarn: true,
        globalInjection: true,//全局注入 $t 函数

    }
}


export const setupI18n = async (app: App) => {
    const options = await createI18nOptions()
    let i18n = createI18n(options) as I18n
    app.use(i18n)
}





/* export const i18n = createI18n({
    legacy: false, // 使用 Composition API 模式，则需要将其设置为false
    globalInjection: true, //全局注入 $t 函数
    locale: globalStore.local, //当前语言
    fallbackLocale: I18N.ZHCN, //回滚语言
    //messages
}) */


