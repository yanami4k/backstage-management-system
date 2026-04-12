import type { MockMethod } from 'vite-plugin-mock'

// 此函数执行返回数组，数组里包含用户信息,用于验证登录信息
function createUserList() {
  return [
    {
      userId: 1,
      avatar: '',
      username: 'admin',
      password: '000000',
      desc: '平台管理员',
      roles: ['平台管理员'],
      routes: ['home'],
      token: 'Admin Token',
    },
    {
      userId: 2,
      avatar: '',
      username: 'system',
      password: '000001',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'System Token',
    },
  ]
}

const mocks: MockMethod[] = [
  {
    // 模拟用户登录接口
    url: '/api/user/login',
    method: 'post',
    response: ({ body }: { body: Record<string, string> }) => {
      // 获取请求体携带过来的用户名和密码
      const { username, password } = body
      //调用获取用户信息的函数，进行登录验证
      const checkUser = createUserList().find(
        (item) => item.username === username && item.password === password,
      )
      //没有用户返回失败信息（code&token）
      if (!checkUser) {
        return {
          code: 201,
          data: { message: '用户名或密码不正确' },
        }
      }
      //如果有返回成功信息code&token
      const { token } = checkUser
      return {
        code: 200,
        data: { token },
      }
    },
  },
  {
    //获取用户信息
    url: '/api/user/info',
    method: 'get',
    response: ({ headers }: { headers: Record<string, string | undefined> }) => {
      // 获取请求头携带的token
      const { token } = headers
      //查看用户信息是否包含有此token用户
      const checkUser = createUserList().find((item) => item.token === token)
      // 返回失败的信息
      if (!checkUser) {
        return {
          code: 201,
          data: { message: '找不到用户' },
        }
      }
      return {
        code: 200,
        data: { checkUser },
      }
    },
  },
]

export default mocks
