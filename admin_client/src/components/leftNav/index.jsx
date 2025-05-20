import React, { Component } from "react";
import "./index.less";
import { Link } from "react-router-dom";
import { Button, Menu } from "antd";
import logo from "../../assets/images/logo.png";
import menuList from "../../config/menuConfig";
import withRouter from "../../utils/withRouter";

class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.openKey = [];
    this.MyMenuList = this.getItem(menuList);
  }
  getItem_map = (menuList) => {
    return menuList.map((item) => {
      return {
        key: item.key,
        icon: item.icon,
        label: item.title,
        children: item.children ? this.getItem_map(item.children) : null,
      };
    });
  };
  getItem = (menuList) => {
    let path = this.props.location.pathname;
    return menuList.reduce((pre, item) => {
      pre.push({
        key: item.key,
        icon: item.icon,
        label: item.children ? (
          item.title
        ) : (
          <Link to={item.key}>{item.title}</Link>
        ),
        children: item.children ? this.getItem(item.children) : null,
      });
      if (item.children && !this.openKey.length) {
        let _item = item.children.find((i) => i.key === path);
        if (_item) {
          this.openKey = [item.key];
        }
        console.log("@@@", this.openKey);
      }
      return pre;
    }, []);
  };
  render() {
    const path = this.props.location.pathname;
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={this.openKey}
          mode="inline"
          theme="dark"
          items={this.MyMenuList}
        />
      </div>
    );
  }
}
export default withRouter(LeftNav);
