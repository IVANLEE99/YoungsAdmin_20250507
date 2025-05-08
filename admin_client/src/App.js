import { useRoutes } from "react-router-dom";
import "./App.less";
import routes from "./routes";
export default function App() {
  let element = useRoutes(routes);
  return <div>{element}</div>;
}
