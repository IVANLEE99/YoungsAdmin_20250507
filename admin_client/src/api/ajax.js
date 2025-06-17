import axios from "axios";
import { message } from "antd";
export const baseURL = "/api";
export const ajax = (url, data = {}, type = "GET") => {
  let promise;
  if (type === "GET") {
    promise = axios.get(baseURL + url, {
      params: data,
    });
  } else {
    promise = axios.post(baseURL + url, data);
  }
  return new Promise((resolve, reject) => {
    promise
      .then((response) => {
        resolve([null, response.data]);
      })
      .catch((error) => {
        message.error(error.message);
        resolve([error, null]);
      });
  });
};
