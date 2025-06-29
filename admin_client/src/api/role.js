import { ajax } from "./ajax";
import { RequestRoleList, RequestAddRole } from "./urls/role";

export const getRoleList = () => ajax(RequestRoleList);

export const addRole = (roleName) => ajax(RequestAddRole, { roleName }, "POST");
