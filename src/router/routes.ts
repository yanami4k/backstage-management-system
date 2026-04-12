// 对外暴露路由表（常量路由）
export const constantRoute = [
  {
    // 登录页面路由
    path: '/login',
    component: () => import('@/views/login/index.vue'), // 懒加载
    name: 'login', // 命名路由：权限系统根据用户信息匹配动态追加菜单视图
  },
  {
    //首页路由
    path: '/home',
    component: () => import('@/views/home/index.vue'),
    name: 'home',
  },
  {
    //404路由
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
