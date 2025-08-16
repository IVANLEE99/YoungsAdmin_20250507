import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import "./index.less";

export default class Charts extends Component {
  render() {
    return (
      <Outlet />
    );
  }
}
