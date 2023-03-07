import { fileURLToPath, URL } from 'node:url'


import { loadEnv, type ConfigEnv, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 按需引入 element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// icon 图标 
/* 
提示： 自动导入不能用于动态component
*/
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import path from 'path'
import Inspect from 'vite-plugin-inspect'

/* 
  i18n
*/
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

const pathSrc = fileURLToPath(new URL('./src', import.meta.url))
const root = process.cwd()

export default ({ command, mode }: ConfigEnv): UserConfig => {
  let env = {} as any
  const isBuild = command === 'build'

  env = loadEnv(mode, root)

  return {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/theme/element-plus.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
        dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: "sass"
          }),
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            prefix: 'i', // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
            // {prefix}-{collection}-{icon} 使用组件解析器时，您必须遵循名称转换才能正确推断图标。
            // alias: { park: 'icon-park' } 集合的别名
            // https://icon-sets.iconify.design/ 
            enabledCollections: ['ep','mdi'],
          }),
        ],
        dts: path.resolve(pathSrc, 'components.d.ts'),
      }),
      Icons({
        autoInstall: true,
      }),
      Inspect(),
      VueI18nPlugin({
        /* options */
        // locale messages resource pre-compile option
        include: path.resolve(pathSrc, 'i18n/locales/**'),
      }),
    ],
    resolve: {
      alias: {
        '@': pathSrc
      }
    }
  }
}

