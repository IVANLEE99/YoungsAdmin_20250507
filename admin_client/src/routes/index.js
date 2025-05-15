import Login from "../pages/login";
import Admin from "../pages/admin";
import Home from "../pages/home";
import Category from "../pages/category";
import Product from "../pages/product";
import Role from "../pages/role";
import Charts from "../pages/charts";
import User from "../pages/user";

const routes = [
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <Admin />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/category", element: <Category /> },
      { path: "/product", element: <Product /> },
      { path: "/role", element: <Role /> },
      { path: "/charts", element: <Charts /> },
      { path: "/user", element: <User /> },
    ],
  },
];
export default routes;
