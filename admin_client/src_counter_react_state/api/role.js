import { ajax } from "./ajax";
import {
  RequestRoleList,
  RequestAddRole,
  RequestUpdateRole,
} from "./urls/role";

export const getRoleList = () => ajax(RequestRoleList);

export const addRole = (roleName) => ajax(RequestAddRole, { roleName }, "POST");

export const updateRole = (role) => ajax(RequestUpdateRole, role, "POST");
