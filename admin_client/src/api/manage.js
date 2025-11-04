import { ajax } from "./ajax";
import { ReqDeleteImg, ReqUploadImg } from "./urls/manage";

//删除图片
export const deleteImg = (name) => ajax(ReqDeleteImg, { name }, "POST");
//上传图片
export const uploadImg = (name) => ajax(ReqUploadImg, { name }, "POST");
