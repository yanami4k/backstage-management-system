//入口文件
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import  globalComponents  from '@/components/index'

import App from './App.vue'
import router from './router'
//引入模板全局样式
import '@/styles/index.scss'

import 'virtual:svg-icons-register'


const app = createApp(App)

app.use(createPinia())
app.use(router)
//注册ElementPlus插件
app.use(ElementPlus, {
  locale: zhCn,
})
//自定义插件注册全局组件
app.use(globalComponents)


app.mount('#app')
