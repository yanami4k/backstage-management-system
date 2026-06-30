// 属性相关的API接口

import request from "@/utils/request";

import type { AttrResponseData, Attr } from "./type";

// 枚举管理属性接口
enum API {
  // 获取分类下已有属性&属性值接口地址
  GETATTR_URL = '/admin/product/attrInfoList',
  // 添加/修改三级分类属性接口地址(post)
  UPDATEATTR_URL = '/admin/product/saveAttrInfo',
  // 删除某一已有的属性接口地址
  DELETEATTR_URL = '/admin/product/deleteAttr'
}


// 获取对应分类下已有属性&属性值接口方法
export const reqGetAttrlist = (c1Id: number, c2Id: number, c3Id: number) =>
  request.get<AttrResponseData>(API.GETATTR_URL + `/${c1Id}/${c2Id}/${c3Id}`)

// 添加/修改三级分类属性接口方法
export const reqUpdateAttr = (data: Attr) => request.post<any>(API.UPDATEATTR_URL, data)

// 删除三级分类接口属性方法
export const reqDeleteAttr = (attrId: number) => request.delete<any>(API.DELETEATTR_URL + `/${attrId}`)
