import type { ResponseData } from "@/api/type"

export interface MenuData {
  id?: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: null
  toCode: null
  type: number
  status: null
  level: number
  children?: MenuData[]
  select: boolean
}

export interface ResMenuData extends ResponseData {
  data: MenuData[]
}

export interface MenuParams {
  id?: number
  level: number | string
  name: string
  pid: number | string
  code: string
}
