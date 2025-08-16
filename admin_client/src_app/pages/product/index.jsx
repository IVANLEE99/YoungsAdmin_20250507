import React, { Component } from "react";
import "./index.less";
import { Outlet } from "react-router-dom";
export default class Product extends Component {
  render() {
    return <Outlet />;
  }
}
