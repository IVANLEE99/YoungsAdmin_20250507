import Login from "../pages/login";
import Admin from "../pages/admin";
import Home from "../pages/home";
import Category from "../pages/category";
import ProductDetail from "../pages/product/detail";
import ProductAddUpdate from "../pages/product/add-update";
import ProductHome from "../pages/product/home";

import Product from "../pages/product";
import Role from "../pages/role";
import Charts from "../pages/charts";
import Bar from "../pages/charts/bar";
import Line from "../pages/charts/line";
import Pie from "../pages/charts/pie";
import User from "../pages/user";
import { Navigate } from "react-router-dom";
const routes = [
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <Admin />,
    children: [
      // 新增索引路由重定向
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "/home", element: <Home /> },
      { path: "/category", element: <Category /> },
      {
        path: "/product",
        element: <Product />,
        children: [
          { path: "/product", element: <ProductHome />, index: true },
          { path: "detail", element: <ProductDetail /> },
          { path: "add-update", element: <ProductAddUpdate /> },
          { path: "*", element: <Navigate to="/product" replace /> },
        ],
      },
      { path: "/role", element: <Role /> },
      {
        path: "/charts",
        element: <Charts />,
        children: [
          {
            path: "bar",
            element: <Bar />,
          },
          {
            path: "line",
            element: <Line />,
          },
          {
            path: "pie",
            element: <Pie />,
          },
          // 处理charts下的未匹配路径
          { path: "*", element: <Navigate to="/charts/bar" replace /> },
        ],
      },
      { path: "/user", element: <User /> },
      // 将通配符路由移动到子路由层级
      { path: "*", element: <Navigate to="/home" replace /> },
    ],
  },
];
export default routes;
