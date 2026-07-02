import type { ResponseData } from "@/api/type"

export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  name?: string
  phone?: number
  roleName?: string
}

export type Records = User[]

export interface ResUserData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}

export interface RoleData {
  id: number
  createTime: string
  updateTime: string
  roleName: string
  remark: null
}

export type AllRole = RoleData[]

export interface ResAllRoleData extends ResponseData {
  data: {
    assignRoles: AllRole
    allRolesList: AllRole
  }
}

export interface SetRoleData {
  roleIdList: number[]
  userId: number
}
