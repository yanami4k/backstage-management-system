import type { ResponseData } from "@/api/type";

export interface SkuData {
  category3Id?: string | number
  spuId?: string | number
  tmId?: string | number
  skuName?: string
  isSale?: number
  price?: string | number
  weight?: string | number
  skuDesc?: string
  skuAttrValueList?: AttrValueListData[]
  skuSaleAttrValueList?: SaleAttrValueListData[]
  skuDefaultImg?: string
  id?: number
  skuImageList?: {
    id: number
    imgUrl: string
  }[]
}

interface AttrValueListData {
  attrId: number | string
  valueId: number | string
  id: number
  valueName: string
}

interface SaleAttrValueListData {
  saleAttrId: number | string
  saleAttrValueId: number | string
  id: number
  saleAttrValueName: string
}

export interface ResSkuData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

export interface ResSkuInfoData extends ResponseData {
  data: SkuData
}
