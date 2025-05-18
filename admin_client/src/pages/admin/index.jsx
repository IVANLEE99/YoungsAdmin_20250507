import React, { Component } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Flex, Layout } from "antd";
import memoryUtils from "../../utils/memoryUtils";
import { message } from "antd";
import LeftNav from "../../components/leftNav";
import Header from "../../components/header";
const { Footer, Sider, Content } = Layout;
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
      <Layout style={{ height: "100vh" }}>
        <Sider width="25%">
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header></Header>
          <Content style={{ margin: "20px 0", backgroundColor: "#fff" }}>
            <Outlet></Outlet>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
