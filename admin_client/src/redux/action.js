import { SET_HEAD_TITLE } from "./actions-type";
export function setHeadTitle(data) {
  return {
    type: SET_HEAD_TITLE,
    data,
  };
}
