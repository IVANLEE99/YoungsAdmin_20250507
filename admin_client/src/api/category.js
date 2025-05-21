import { ajax } from "./ajax";
import {
  RequestCategory,
  RequestAddCategory,
  RequestUpdateCategory,
} from "./urls/category";

//获取分类列表
export const getCategoryList = (parentId = "0") =>
  ajax(RequestCategory, { parentId });
//添加分类
export const addCategory = ({ categoryName, parentId }) =>
  ajax(RequestAddCategory, { categoryName, parentId }, "POST");
//更新分类
export const updateCategory = ({ categoryName, categoryId }) =>
  ajax(RequestUpdateCategory, { categoryName, categoryId }, "POST");
