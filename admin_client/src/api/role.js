import { ajax } from "./ajax";
import { RequestRoleList } from "./urls/role";

export const getRoleList = () => ajax(RequestRoleList);
