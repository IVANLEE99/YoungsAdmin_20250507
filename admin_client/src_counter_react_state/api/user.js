import { ajax } from "./ajax";
import {
  RequestUserList,
  RequestAddUser,
  RequestUpdateUser,
  RequestDeleteUser,
} from "./urls/user";

export const getUserList = () => ajax(RequestUserList);

export const addUser = (user) => ajax(RequestAddUser, user, "POST");

export const updateUser = (user) => ajax(RequestUpdateUser, user, "POST");

export const deleteUser = (userId) =>
  ajax(RequestDeleteUser, { userId }, "POST");
