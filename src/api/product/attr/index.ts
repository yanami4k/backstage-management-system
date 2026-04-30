// 属性相关的API接口
import request from "@/utils/request";

import type { CategoryResponseData,AttrResponseData } from "./type";

// 枚举管理属性接口
enum API {
  // 获取1/2/3级属性分类接口地址
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2',
  C3_URL = '/admin/product/getCategory3',
  // 获取分类下已有属性&属性值接口地址
  ATTR_URL = '/admin/product/attrInfoList'
}

// 获取属性分类接口方法
export const reqGetCategory1 = () => request.get<CategoryResponseData>(API.C1_URL)
export const reqGetCategory2 = (c1Id:number) => request.get<CategoryResponseData>(API.C2_URL+`/${c1Id}`)
export const reqGetCategory3 = (c2Id:number) => request.get<CategoryResponseData>(API.C3_URL+`/${c2Id}`)

// 获取对应分类下已有属性&属性值接口方法
export const reqGetAttrlist = (c1Id: number, c2Id: number, c3Id: number) =>
  request.get<AttrResponseData>(API.ATTR_URL + `/${c1Id}/${c2Id}/${c3Id}`)
