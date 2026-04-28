// 统一管理项目用户相关接口
import request from '@/utils/request'
import type { LoginFormData, LoginResponseData, UserInfoResponseData } from './type'

// 创建枚举类型管理请求地址接口
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',                                                                                                                   
  LOGOUT_URL = '/admin/acl/index/logout'
}
// 暴露请求方法

// 用户登录接口方法
export const reqLogin = (data: LoginFormData) => request.post<any,LoginResponseData>(API.LOGIN_URL, data)

// 获取用户信息接口方法
export const reqUserInfo = () => request.get<any,UserInfoResponseData>(API.USERINFO_URL)

// 退出登录
export const reqLogout = () => request.post<any,any>(API.LOGOUT_URL)