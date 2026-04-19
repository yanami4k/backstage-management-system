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
// <any,LoginResponseData>:方法最终返回的结果类型，就是 LoginResponseData,不用管请求体 / 默认响应体那部分（防止拦截器简化后的类型冲突）
export const reqLogin = (data: LoginForm) => request.post<any,LoginResponseData>(API.LOGIN_URL, data)
// 获取用户信息接口方法
export const reqUserInfo = () => request.get<any,UserResponseData>(API.USERINFO_URL)
