// 项目公共接口
// 后端统一响应格式，所有接口返回的 JSON 最外层都是这个结构
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
