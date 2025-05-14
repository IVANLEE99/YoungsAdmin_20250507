import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import memoryUtils from "./utils/memoryUtils";
import storageUtils from "./utils/storageUtils";
import "@ant-design/v5-patch-for-react-19";
import { unstableSetRender } from "antd";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";

unstableSetRender((node, container) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

const user = storageUtils.getUser();
if (user && user._id) {
  memoryUtils.user = user;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyleProvider hashPriority="high">
    <React.StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1DA57A",
          },
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </React.StrictMode>
  </StyleProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
