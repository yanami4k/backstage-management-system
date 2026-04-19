// 定义用户登录需要携带参数的类型
export interface LoginForm {
  username: string
  password: string
}

//定义登录接口返回数据类型
export interface LoginResponseData {
  code: number
  data: {
    token?: string
    message?: string
  }
}

interface UserInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: Array<string>
  routes: Array<string>
  token: string
}

//定义服务器返回用户信息相关的数据类型
interface User {
  checkUser: UserInfo
}

export interface UserResponseData {
  code: number
  data: User
}
