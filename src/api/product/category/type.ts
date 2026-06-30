// 与商品分类相关的ts数据定义

import type { ResponseData } from "@/api/type";

// 属性分类对象ts类型
export interface Category {
  id: number | string,
  name: string,
  category1Id?: number,
  category2Id?: number
}

// 相应属性分类列表接口的返回类型
export interface CategoryResponseData extends ResponseData {
  data: Category[]
}
