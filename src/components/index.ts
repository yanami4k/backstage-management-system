//自定义插件-注册整个项目的全局组件
import type { App } from 'vue'
import SvgIcon from './SvgIcon/SvgIcon.vue'

//收集组件对象（key）
const allGlobalComponent = { SvgIcon }

// 引入element-plus图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


export default {
  //插件对象的install函数可获得app
  install(app: App) {
    (Object.keys(allGlobalComponent) as Array<keyof typeof allGlobalComponent>).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    });
    //将element-plus提供的图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}

