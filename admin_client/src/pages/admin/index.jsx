import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import { message } from "antd";

export default class Admin extends Component {
  logout = () => {
    console.log("退出");
    message.success("退出成功");
  };
  render() {
    const user = memoryUtils.user;
    if (!user || !user._id) {
      return <Navigate to="/login" />;
    }
    return (
      <div>
        <h1 onClick={this.logout}>Admin, {user.username}</h1>
      </div>
    );
  }
}
