// 品牌管理模块接口
import request from "@/utils/request";
import type { TradeMarkResponseData,TradeMark } from "./type";
// 品牌管理模块接口地址
enum API{
    ///admin/product/baseTrademark/{page}/{limit},:{page}/{limit}方法参数，在方法路径参数中拼接，不直接写在URL中
    TRADEMARK_URL="/admin/product/baseTrademark/",
    // 添加品牌接口
    ADDTRADEMARK_URL="/admin/product/baseTrademark/save",
    // 修改已有品牌接口
    UPDATETRADEMARK_URL="/admin/product/baseTrademark/update",
    // 删除已有品牌接口
    DELETE_URL = "/admin/product/baseTrademark/remove"
}
// 获取已有品牌的接口方法
// page:获取第几页的数据（默认第一页）
// limit:获取几个已有品牌的数据
export const reqHasTrademark = (page:number,limit:number) => request.get<TradeMarkResponseData>(API.TRADEMARK_URL+`${page}/${limit}`)

// 添加/修改已有品牌的接口方法
export const reqAddOrUpdateTrademark = (data:TradeMark) =>{
  //数据带有id属性->已有品牌，修改品牌数据
  //数据无id属性->未有品牌，新增品牌数据
  if(data.id){
    return request.put<any>(API.UPDATETRADEMARK_URL,data)
  }else{
    return request.post<any>(API.ADDTRADEMARK_URL,data)
  }
}

// 删除已有品牌的方法
export const reqDeleteTrademark = (id:number) =>request.delete<any>(API.DELETE_URL+`/${id}`)
