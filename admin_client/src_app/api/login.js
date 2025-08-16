import { ajax } from "./ajax";
import { RequestLogin } from "./urls/login";

export const login = (data) => ajax(RequestLogin, data, "POST");
