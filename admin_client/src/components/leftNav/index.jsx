import React, { Component } from "react";
import "./index.less";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import logo from "../../assets/images/logo.png";

const items = [
  { key: "1", icon: <PieChartOutlined />, label: "首页" },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: "商品",
    children: [
      { key: "2-1", label: "商品管理" },
      { key: "2-2", label: "商品分类" },
      { key: "2-3", label: "商品规格" },
      { key: "2-4", label: "商品评论" },
    ],
  },
  { key: "3", icon: <ContainerOutlined />, label: "订单" },
  {
    key: "4",
    label: "系统设置",
    icon: <MailOutlined />,
    children: [
      { key: "4-1", label: "Option 5" },
      { key: "4-2", label: "Option 6" },
      { key: "4-3", label: "Option 7" },
      { key: "4-4", label: "Option 8" },
    ],
  },
  {
    key: "5",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      { key: "5-1", label: "Option 9" },
      { key: "5-2", label: "Option 10" },
      {
        key: "5-3",
        label: "Submenu",
        children: [
          { key: "5-3-1", label: "Option 11" },
          { key: "5-3-2", label: "Option 12" },
        ],
      },
    ],
  },
];
export default class LeftNav extends Component {
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
          items={items}
        />
      </div>
    );
  }
}
