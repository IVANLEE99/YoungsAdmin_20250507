import React, { Component } from "react";
import "./index.less";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import logo from "../../assets/images/logo.png";
import menuList from "../../config/menuConfig";
import withRouter from "../../utils/withRouter";
import memoryUtils from "../../utils/memoryUtils";

class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.openKey = [];
    this.MyMenuList = this.getItem(menuList);
  }
  // getItem_map = (menuList) => {
  //   return menuList.map((item) => {
  //     return {
  //       key: item.key,
  //       icon: item.icon,
  //       label: item.title,
  //       children: item.children ? this.getItem_map(item.children) : null,
  //     };
  //   });
  // };
  hasAuth = (item) => {
    // 1、当前用户是admin
    // 2、当前用户有此权限
    // 3、当前用户有此菜单
    // 4、当前菜单是公开的
    let { isPublic, key } = item;
    const { username, role = { menus: [] } } = memoryUtils.user;
    if (username === "admin" || isPublic || role.menus.includes(key)) {
      return true;
    }
    // 如果item有子菜单，则递归判断子菜单
    if (item.children) {
      return item.children.some((child) => this.hasAuth(child));
    }
    return false;
  };
  getItem = (menuList) => {
    let path = this.props.location.pathname;
    return menuList.reduce((pre, item) => {
      if (this.hasAuth(item)) {
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
          let _item = item.children.find((i) => path.indexOf(i.key) === 0);
          if (_item) {
            this.openKey = [item.key];
          }
          console.log("@@@", this.openKey);
        }
      }
      return pre;
    }, []);
  };
  render() {
    const path = this.props.location.pathname;
    let selectedKeys = [path];
    if (path.indexOf("/product") === 0) {
      selectedKeys = ["/product"];
    }
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </Link>
        <Menu
          selectedKeys={selectedKeys}
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
