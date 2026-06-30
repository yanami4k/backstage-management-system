// SPU管理模块的API接口

import request from "@/utils/request";
import type { HasSpuResponseData, AllTradeMark, SpuHasImg, SaleAttrResponseData, HasSaleAttrResponseData, SpuData, SkuInfoData, SkuAddResp } from "./type";
import type { ResponseData } from "@/api/type";

enum API {
  // 获取已有的SPU的数据url
  HASSPU_URL = '/admin/product',

  // 获取全部品牌的数据
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取某一个SPU下全部商品图片数据
  IMAGE_URL = '/admin/product/spuImageList',
  // 获取某一个SPU下全部的已有的销售属性接口地址
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList',
  // 获取项目全部的销售属性【颜色、版本、尺码】
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',

  // 追加SPU接口
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  // 更新SPU接口
  UPDATESPU_URL = '/admin/product/updateSpuInfo',

  // 查看某一个已有的SPU下全部SKU
  SKUINFO_URL = '/admin/product/findBySpuId',
  // 删除某一个SPU
  DELETESPU_URL = '/admin/product/deleteSpu',
  // 添加一个SKU
  ADDSKU_URL = '/admin/product/saveSkuInfo'
}

// 获取某一个三级分类下已有的SPU数据
export const reqHasSpu = (page: number, limit: number, category3Id: number) => request.get<HasSpuResponseData>(API.HASSPU_URL + `/${page}/${limit}?category3Id=${category3Id}`)

// 获取全部spu品牌的数据
export const reqAllTradeMark = () => request.get<AllTradeMark>(API.ALLTRADEMARK_URL)

// 获取某一个已有的SPU下全部商品的图片地址
export const reqSpuImageList = (spuId: number) => request.get<SpuHasImg>(API.IMAGE_URL + `/${spuId}`)

// 获取某一个已有的SPU拥有多少个销售属性
export const reqSpuHasSaleAttr = (spuId: number) => request.get<SaleAttrResponseData>(API.SPUHASSALEATTR_URL + `/${spuId}`)

// 获取全部的销售属性
export const reqAllSaleAttr = () => request.get<HasSaleAttrResponseData>(API.ALLSALEATTR_URL)

// 添加 | 更新 SPU
export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    return request.post<ResponseData>(API.UPDATESPU_URL, data)
  } else {
    return request.post<ResponseData>(API.ADDSPU_URL, data)
  }
}

// 添加一个SKU
export const reqAddSku = (sku: any) => request.post<SkuAddResp>(API.ADDSKU_URL, sku)

// 查看某一个已有的SPU下全部SKU
export const reqSkuListBySpu = (spuId: number) => request.get<SkuInfoData>(API.SKUINFO_URL + `/${spuId}`)

// 删除某一个SPU
export const reqDelSpu = (spuId: number) => request.delete<ResponseData>(API.DELETESPU_URL + `/${spuId}`)
