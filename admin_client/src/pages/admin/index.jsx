import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Flex, Layout } from 'antd';
import memoryUtils from "../../utils/memoryUtils";
import { message } from "antd";
import LeftNav from "../../components/leftNav";
import Header from "../../components/header";
const { Footer, Sider, Content } = Layout;
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};
const layoutStyle = {
  borderRadius: 0,
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
  height: "100vh"
};

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
      <Layout style={layoutStyle}>
        <Sider width="25%" style={siderStyle}>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header></Header>
          <Content style={contentStyle}>Content</Content>
          <Footer style={footerStyle}>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
