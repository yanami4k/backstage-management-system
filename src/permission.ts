// 路由鉴权
import router from "./router";

// 引入nprogress插件js和样式
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//修改进度条样式
NProgress.configure({ showSpinner: false })

//获取userStore仓库
import pinia from './stores'
import { useUserStore } from './stores/modules/user'
import setting from "./setting";

const userStore = useUserStore(pinia)



// 全局前置守卫
// to:将要访问的路由
// from:从哪个路由来
// next:路由的放行函数

router.beforeEach(async (to, from, next) => {
    //网页title设置
    document.title = `${setting.title}-${to.meta.title}`
    //进度条开始
    NProgress.start()

    //获取token。判断登录还是未登录
    let token = userStore.token
    //获取用户名
    let username = userStore.username

    if (token) {
        //用户登录成功
        if (to.path == '/login') {
            //访问login，跳转到/
            next({ path: '/' })
        } else {
            //访问其余的路由，有用户信息才能跳转
            if (username) {
                next()
            } else {
                //如果没有用户信息，由路由守卫发送请求获取信息再跳转
                try {
                    await userStore.userInfo()
                    next()
                } catch (error) {
                    //token过期或用户手动修改了token
                    //退出登录（清除过期/失效数据）
                    await userStore.userLogout()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    } else {
        //用户未登录
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
})

// 全局后置守卫
router.afterEach((to, from) => {
    NProgress.done()
});
