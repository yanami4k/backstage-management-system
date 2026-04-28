import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

//loadEnv：加载对应环境的环境变量
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueDevTools from 'vite-plugin-vue-devtools'

// 引入插件：vite-plugin-mock
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command, mode }) => {
  //获取各个环境下的对应变量，mode:模式，默认是开发环境。指向process.cwd()项目根目录，环境变量文件所在位置
  let env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      vueDevTools(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[name]',
      }),
      viteMockServe({
        mockPath: 'mock',
        enable: command === 'serve', //把现在固定对象写法的 defineConfig({ ... })，改成函数写法 defineConfig(({ command }) => ({ ... }))，这样才能拿到 command
        watchFiles: true,
        logger: true,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    //scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/variable.scss" as *;',
          //@use ：新版 Sass 推荐写法，用来替代旧的 @import；'as * '表示“把这个文件里的变量、mixin、function 直接暴露到当前作用域里，不用再写命名空间”。
        },
      },
    },
    //配置代理跨域
    server: {
      proxy: {
        //代理服务器，解决跨域
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //开启代理跨域
          changeOrigin: true,
          //路径重写，送达服务端的路径去掉api字段
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), '')
        },
        //代理静态资源图片路径
        '/api': {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    }
  }
}
)
