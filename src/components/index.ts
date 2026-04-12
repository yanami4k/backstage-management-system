//自定义插件-注册整个项目的全局组件
import type { App } from 'vue'
import SvgIcon from './SvgIcon/SvgIcon.vue'


//收集组件对象（key）
const allGlobalComponent = { SvgIcon }

export default {
    //插件对象的install函数可获得app
    install(app:App){
        (Object.keys(allGlobalComponent) as Array<keyof typeof allGlobalComponent>).forEach(key =>{app.component(key,allGlobalComponent[key]) 
        })
    }
}

//a:any 更稳的修法不是给它加 Record<string, ...>，而是把 key 收窄成对象自身的键。


