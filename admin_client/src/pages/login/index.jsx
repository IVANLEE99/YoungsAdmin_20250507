import React, { Component } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import logo from "./images/logo.png";
import "./index.less";
export default class Login extends Component {
  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  render() {
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" className="login-logo" />
          <div className="login-title">后台管理系统</div>
        </header>
        <section className="login-content">
          <div className="form-title">用户登录</div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "请输入用户名",
                },
                {
                  min: 4,
                  max: 12,
                  message: "用户名长度在4-12位之间",
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "用户名只能由数字、字母和下划线组成",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "请输入密码",
                },
                {
                  min: 4,
                  max: 12,
                  message: "密码长度在4-12位之间",
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "密码只能由数字、字母和下划线组成",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
