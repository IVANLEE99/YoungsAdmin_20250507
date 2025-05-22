import { ajax } from "./ajax";
import {
  RequestProductList,
  RequestAddProduct,
  RequestUpdateProduct,
  RequestUpdateStatus,
  RequestProductDetail,
  RequestProductSearch,
} from "./urls/product";
import { PAGE_SIZE } from "../utils/constant";

//获取商品列表
export const getProductList = (pageNum = 1, pageSize = PAGE_SIZE) =>
  ajax(RequestProductList, { pageNum, pageSize });
//添加商品
export const addProduct = (product) => ajax(RequestAddProduct, product, "POST");
//更新商品
export const updateProduct = (product) =>
  ajax(RequestUpdateProduct, product, "POST");
//更新商品状态
export const updateStatus = ({ productId, status }) =>
  ajax(RequestUpdateStatus, { productId, status }, "POST");
//获取商品详情
export const getProductDetail = (productId) =>
  ajax(RequestProductDetail, { productId });
//搜索商品
export const searchProduct = (productName) =>
  ajax(RequestProductSearch, { productName });
