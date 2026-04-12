// 入口文件

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import globalComponents from '@/components/index'

import App from './App.vue'

// 引入模板全局样式
import '@/styles/index.scss'
// 引入svg注册器
import 'virtual:svg-icons-register'
// 引入路由
import router from './router'

const app = createApp(App)

app.use(createPinia())
// 注册ElementPlus插件
app.use(ElementPlus, {
  locale: zhCn,
})
// 自定义插件注册全局组件
app.use(globalComponents)
// 注册模板路由
app.use(router)

// 应用挂载到根容器
app.mount('#app')
