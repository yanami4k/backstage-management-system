// 商品分类相关的API

import request from "@/utils/request";
import type{ CategoryResponseData } from "./type";

enum API {
  // 获取1/2/3级属性分类接口地址
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2',
  C3_URL = '/admin/product/getCategory3'
}

// 获取属性分类接口方法
export const reqGetCategory1 = () => request.get<CategoryResponseData>(API.C1_URL)
export const reqGetCategory2 = (c1Id: number) => request.get<CategoryResponseData>(API.C2_URL + `/${c1Id}`)
export const reqGetCategory3 = (c2Id: number) => request.get<CategoryResponseData>(API.C3_URL + `/${c2Id}`)
