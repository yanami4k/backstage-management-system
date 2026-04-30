import type { ResponseData } from "@/api/type";

// 属性分类对象ts类型
export interface Category{
  id:number|string,
  name:string,
  category1Id?:number,
  category2Id?:number
}

// 相应属性分类列表接口的返回类型
export interface CategoryResponseData extends ResponseData{
  data:Category[]
}

// 属性值对象ts类型（包含于属性对象）
export interface AttrValue{
  id?:number,         // 新增时可不传，更新时必须传
  valueName:string,
  attrId?: number      // 所属属性 ID，后端自动赋值
}

// 属性对象ts类型（同时也是保存接口的请求体）
export interface Attr {
  id?: number
  attrName: string
  categoryId: number
  categoryLevel: number
  attrValueList: AttrValue[]
}

// 属性列表接口的返回类型
export interface AttrResponseData extends ResponseData {
  data: Attr[]
}
