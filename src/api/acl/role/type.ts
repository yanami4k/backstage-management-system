import type { ResponseData } from "@/api/type"

export interface RoleData {
  id?: number | string
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: string
}

export type AllRole = RoleData[]

export interface ResAllRoleData extends ResponseData {
  data: {
    records: AllRole
    total: number
    size: number
    current: number
    page: number
  }
}

export interface MenuData {
  id: number
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
