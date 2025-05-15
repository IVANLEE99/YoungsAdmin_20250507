import React, { Component } from "react";
import "./index.less";
import { Link } from "react-router-dom";
import { Button, Menu } from "antd";
import logo from "../../assets/images/logo.png";
import menuList from "../../config/menuConfig";
export default class LeftNav extends Component {
  getItem = (menuList) => {
    return menuList.map((item) => {
      return {
        key: item.key,
        icon: item.icon,
        label: item.title,
        children: item.children ? this.getItem(item.children) : null,
      };
    });
  };
  render() {
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </Link>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          items={this.getItem(menuList)}
        />
      </div>
    );
  }
}
