import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 按需引入 element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// icon 图标
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import path from 'path'
import Inspect from 'vite-plugin-inspect'

const pathSrc = fileURLToPath(new URL('./src', import.meta.url))


// https://vitejs.dev/config/
export default defineConfig({
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
        ElementPlusResolver(),
         // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
    Icons({
      autoInstall: true,
    }),
    Inspect(),
  ],
  resolve: {
    alias: {
      '@': pathSrc
    }
  }
})
