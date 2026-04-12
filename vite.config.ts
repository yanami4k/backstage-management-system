import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  //scss全局变量配置
  css:{
    preprocessorOptions:{
      scss:{
        additionalData: '@use "@/styles/variable.scss" as *;'
        //@use ：新版 Sass 推荐写法，用来替代旧的 @import；'as * '表示“把这个文件里的变量、mixin、function 直接暴露到当前作用域里，不用再写命名空间”。
      }
    }
  }
})
