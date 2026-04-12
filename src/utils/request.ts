//对axios进行二次封装，使用请求和响应拦截器
import axios from 'axios'
//引入element-plus的消息提示组件
import { ElMessage } from 'element-plus'

//axios.creat()方法创建axios实例，传入配置
const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
})
// 请求拦截器
request.interceptors.request.use((config) => {
  // 返回配置对象，否则请求拦截器不能工作
  return config
})
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    //成功回调：简化数据
    return response.data
  },
  (error) => {
    //失败回调：处理http网络错误
    //存储http状态码
    const status = error.response.status
    //存储网络错误信息
    let message: string
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器故障'
        break
      default:
        message = '网络错误'
        break
    }
    //ElMessage提示错误信息
    ElMessage({
      type: 'error',
      message: message,
    })
    return Promise.reject(error)
  },
)

//对外暴露
export default request
