import type { ResponseData } from "@/api/type";

export interface SpuData {
  id?: number | string
  spuName: string
  description: string
  category3Id: number | string
  tmId: number | string
  spuSaleAttrList?: null | SaleAttrData[]
  spuImageList?: null | SpuImg[]
}

export type SPUListData = SpuData[]

export interface HasSpuResponseData extends ResponseData {
  data: {
    records: SPUListData
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}

export interface AllTradeMark extends ResponseData {
  data: Trademark[]
}

export interface SpuImg {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  imgName?: string
  imgUrl?: string
  name?: string
  url?: string
}

export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}

export interface SaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}

export type spuSaleAttrValueList = SaleAttrValue[]

export interface SaleAttrData {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  flag?: boolean
  saleAttrValue?: string
  spuSaleAttrValueList: SaleAttrValue[]
}

export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttrData[]
}

export interface HasSaleAttr {
  id: number
  name: string
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}

export interface ResSkuData {
  category3Id: string | number
  spuId: string | number
  tmId: string | number
  skuName: string
  price: string | number
  weight: string | number
  skuDesc: string
  skuAttrValueList?: AttrValueListData[]
  skuSaleAttrValueList?: SaleAttrValueListData[]
  skuDefaultImg: string
}

interface AttrValueListData {
  attrId: number | string
  valueId: number | string
}

interface SaleAttrValueListData {
  saleAttrId: number | string
  saleAttrValueId: number | string
}

export interface SkuInfoData extends ResponseData {
  data: ResSkuData[]
}

export interface SkuAddResp extends ResponseData {
  data: any
}
