import request from "@/utils/request";
import type { ResMenuData, MenuParams } from "./type";
import type { ResponseData } from "@/api/type";

enum API {
  ALLPERMISSION_URL = '/admin/acl/permission',
  ADDMENU_URL = '/admin/acl/permission/save',
  UPDATE_URL = '/admin/acl/permission/update',
  DELMENU_URL = '/admin/acl/permission/remove/'
}

export const reqAllPermission = () =>
  request.get<ResMenuData>(API.ALLPERMISSION_URL)

export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<ResponseData>(API.UPDATE_URL, data)
  } else {
    return request.post<ResponseData>(API.ADDMENU_URL, data)
  }
}

export const reqRemoveMenu = (id: number) =>
  request.delete<ResponseData>(API.DELMENU_URL + id)
