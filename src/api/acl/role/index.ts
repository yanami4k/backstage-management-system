import request from "@/utils/request";
import type { ResAllRoleData, RoleData, ResMenuData } from "./type";
import type { ResponseData } from "@/api/type";

enum API {
  ALLROLE_URL = '/admin/acl/role/',
  ADDROLE_URL = '/admin/acl/role/save',
  UPDATE_URL = '/admin/acl/role/update',
  ROLEPERMISSION = '/admin/acl/permission/toAssign/',
  SETPERMISSION_URL = '/admin/acl/permission/doAssign',
  DELPERMISSION_URL = '/admin/acl/role/remove/'
}

export const reqAllRole = (page: number, limit: number, roleName: string) =>
  request.get<ResAllRoleData>(API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`)

export const reqAddOrUpdate = (data: RoleData) => {
  if (data.id) {
    return request.put<ResponseData>(API.UPDATE_URL, data)
  } else {
    return request.post<ResponseData>(API.ADDROLE_URL, data)
  }
}

export const reqRolePermission = (roleId: number) =>
  request.get<ResMenuData>(API.ROLEPERMISSION + roleId)

export const reqSetPermission = (roleId: number, permissionId: number[]) =>
  request.post<ResponseData>(API.SETPERMISSION_URL + `?roleId=${roleId}&permissionId=${permissionId}`)

export const reqRemovePermission = (id: number) =>
  request.delete<ResponseData>(API.DELPERMISSION_URL + id)
