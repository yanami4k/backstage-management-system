import { defineStore } from "pinia";
import { ref, reactive } from "vue";
// 引入发送请求接口
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
// 引入api ts数据类型
import type { LoginFormData, LoginResponseData, UserInfoResponseData } from "@/api/user/type";
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";

// 引入常量路由
import { constantRoute } from "@/router/routes";

// 引入ts路由器对象数据类型
import type { RouteRecordRaw } from "vue-router"

// 创建用户相关的小仓库
export const useUserStore = defineStore('User', () => {
    //定义仓库token属性，带泛型定义
    const token = ref<string | null>(GET_TOKEN())
    //定义仓库路由对象数组属性，带泛型定义
    const menuRoutes = reactive<RouteRecordRaw[]>(constantRoute)
    //定义用户信息：头像和名字
    const username = ref('')
    const avatar = ref('')

    //用户登录的方法
    async function userLogin(data: LoginFormData) {
        // 发送请求
        const result: LoginResponseData = await reqLogin(data)
        // 登录请求：成功 200->token
        // 登录请求：失败 200->token
        // 进入这个分支时result.data.token 一定存在，后面赋值不会报错
        if (result.code === 200 && result.data) {
            // 登录成功，pinia储存token
            token.value = result.data
            // 浏览器本地持久化储存token
            SET_TOKEN(result.data)
            // 此时async函数返回成功的promise
            return 'ok'
        } else {
            // 此时返回失败的promise
            return Promise.reject(new Error(result.message || '登录失败'))
        }
    }

    //获取用户信息
    async function userInfo() {
        //获取用户信息存储到仓库中（用户头像、名字） 
        let result: UserInfoResponseData = await reqUserInfo()
        // 如果获取用户信息成功，存储用户信息
        if (result.code == 200) {
            username.value = result.data.name
            avatar.value = result.data.avatar
            return 'ok'
        } else {
            return Promise.reject('获取用户信息失败')
        }
    }

    //用户退出登录
    async function userLogout() {
        let result: any = await reqLogout()
        if (result.code == 200) {
            token.value = ''
            username.value = ''
            avatar.value = ''
            REMOVE_TOKEN()
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    }

    return { userLogin, token, menuRoutes, userInfo, username, avatar, userLogout }
})