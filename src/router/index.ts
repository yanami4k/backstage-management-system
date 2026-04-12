// vue-router实现模板路由配置
import { createRouter, createWebHistory } from 'vue-router'
//引入路由表
import { constantRoute } from './routes'

// 创建路由器对象
const router = createRouter({
  // 路由模式：History
  history: createWebHistory(),
  routes: constantRoute,
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
