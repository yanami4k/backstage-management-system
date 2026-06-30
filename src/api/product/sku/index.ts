import request from "@/utils/request";
import type { ResSkuData, ResSkuInfoData } from "./type";
import type { ResponseData } from "@/api/type";

enum API {
  SKU_URL = '/admin/product/list',
  ONSALE_URL = '/admin/product/onSale',
  CANCELSALE_URL = '/admin/product/cancelSale',
  SKUINFO_URL = '/admin/product/getSkuInfo',
  DELETESKU_URL = '/admin/product/deleteSku'
}

export const reqSkuList = (page: number, limit: number) => request.get<ResSkuData>(API.SKU_URL + `/${page}/${limit}`)

export const reqOnSaleSku = (skuId: number) => request.get<ResponseData>(API.ONSALE_URL + `/${skuId}`)

export const reqCancelSaleSku = (skuId: number) => request.get<ResponseData>(API.CANCELSALE_URL + `/${skuId}`)

export const reqSkuInfo = (skuId: number) => request.get<ResSkuInfoData>(API.SKUINFO_URL + `/${skuId}`)

export const reqDelSku = (skuId: number) => request.delete<ResponseData>(API.DELETESKU_URL + `/${skuId}`)
