import React, { Component } from "react";
import "./index.less";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，admin</span>
          <a
            href="javascript:void(0)"
            onClick={() => {
              this.props.history.push("/login");
            }}
          >
            退出
          </a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">首页</div>
          <div className="header-bottom-right">
            <span>2025-05-18 12:00:00</span>
            <img
              src="https://gips2.baidu.com/it/u=3319407664,1312150496&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f84_84"
              alt=""
            />
            <span>晴</span>
          </div>
        </div>
      </div>
    );
  }
}
