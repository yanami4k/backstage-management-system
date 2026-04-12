// 统一管理项目用户相关接口
import request from '@/utils/request'
import type { LoginForm, LoginResponseData, UserResponseData } from './type'

// 创建枚举类型管理接口
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}
// 暴露请求方法
// 用户登录接口方法
export const reqLogin = (data: LoginForm) => request.post<LoginResponseData>(API.LOGIN_URL, data)
// 获取用户信息接口方法
export const reqUserInfo = () => request.get<UserResponseData>(API.USERINFO_URL)
