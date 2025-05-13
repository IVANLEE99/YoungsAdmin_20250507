import { useRoutes, useNavigate } from "react-router-dom";
import React from "react";
import "./App.less";
import routes from "./routes";

export default function App() {
  const navigate = useNavigate();

  let element = useRoutes(
    routes.map((route) => ({
      ...route,
      element: React.cloneElement(route.element, { navigate }),
    }))
  );
  return <div>{element}</div>;
}
