// 入口文件
import { createApp } from 'vue'

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import globalComponents from '@/components/index'

import App from './App.vue'

import pinia from './stores'

// 引入模板全局样式
import '@/styles/index.scss'
// 引入svg注册器
import 'virtual:svg-icons-register'
// 引入路由
import router from './router'
// 引入vue3-lottie
import Lottie from 'vue3-lottie'

import './permission'

const app = createApp(App)


// 注册ElementPlus插件
app.use(ElementPlus, {
  locale: zhCn,
})
// 自定义插件注册全局组件
app.use(globalComponents)
// 注册模板路由
app.use(router)
// 注册vue3-lottie
app.use(Lottie)
//安装pinia
app.use(pinia)

// 应用挂载到根容器
app.mount('#app')
