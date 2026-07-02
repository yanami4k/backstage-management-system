import request from "@/utils/request";
import type { ResUserData, User, ResAllRoleData, SetRoleData } from "./type";
import type { ResponseData } from "@/api/type";

enum API {
  ALLUSER_URL = '/admin/acl/user/',
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATEUSER_URL = '/admin/acl/user/update',
  ALLROLEURL = '/admin/acl/user/toAssign/',
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  DELETEUSER_URL = '/admin/acl/user/remove/',
  DELETESELECTUSER_URL = '/admin/acl/user/batchRemove'
}

export const reqUserInfo = (page: number, limit: number, username: string) =>
  request.get<ResUserData>(API.ALLUSER_URL + `${page}/${limit}/?username=${username}`)

export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.post<ResponseData>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<ResponseData>(API.ADDUSER_URL, data)
  }
}

export const reqAllRole = (userId: number) =>
  request.get<ResAllRoleData>(API.ALLROLEURL + userId)

export const reqSetRole = (data: SetRoleData) =>
  request.post<ResponseData>(API.SETROLE_URL, data)

export const reqDelUser = (userId: number) =>
  request.delete<ResponseData>(API.DELETEUSER_URL + userId)

export const reqDelSelectUser = (idList: number[]) =>
  request.delete<ResponseData>(API.DELETESELECTUSER_URL, { data: idList })
