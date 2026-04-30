// 引入返回数据类型通用接口
import type { ResponseData } from '@/api/type'

// 用户登录接口携带参数的ts类型
export interface LoginFormData {
  username: string
  password: string
}

// 定义登录接口返回数据类型
export interface LoginResponseData extends ResponseData {
  data: string
}

// 定义获取用户信息返回的数据类型
export interface UserInfoResponseData extends ResponseData {
  data: {
    routes: string[],
    buttons: string[],
    roles: string[],
    name: string,
    avatar: string
  }
}


