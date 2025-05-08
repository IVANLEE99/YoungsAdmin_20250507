import Login from "../pages/login";
import Admin from "../pages/admin";
const routes = [
  { path: "/login", element: <Login /> },
  { path: "/", element: <Admin /> },
];
export default routes;
