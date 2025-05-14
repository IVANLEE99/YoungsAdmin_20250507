import React, { Component } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import logo from "./images/logo.png";
import "./index.less";
import { login } from "../../api/login";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import { Navigate } from "react-router-dom";
export default class Login extends Component {
  onFinish = async (values) => {
    let [err, res] = await login(values);
    if (res) {
      if (res.code === 0) {
        message.success("登录成功");
        memoryUtils.user = res.data;
        storageUtils.saveUser(res.data);
        this.props.navigate("/");
      } else {
        message.error(res.message);
      }
    } else {
      message.error(err.message);
    }
  };
  resetForm = () => {
    this.formRef.resetFields();
  };
  render() {
    const user = memoryUtils.user;
    if (user && user._id) {
      return <Navigate to="/" />;
    }
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" className="login-logo" />
          <div className="login-title">后台管理系统</div>
        </header>
        <section className="login-content">
          <div className="form-title">用户登录</div>
          <Form
            ref={(e) => (this.formRef = e)}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              validateTrigger={["onBlur", "onChange"]}
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
              validateTrigger={["onBlur", "onChange"]}
              rules={[
                // {
                //   required: true,
                //   whitespace: true,
                //   message: "请输入密码",
                // },
                // {
                //   min: 4,
                //   max: 12,
                //   message: "密码长度在4-12位之间",
                // },
                // {
                //   pattern: /^[a-zA-Z0-9_]+$/,
                //   message: "密码只能由数字、字母和下划线组成",
                // },
                // (_v, _v2) => ({
                //   validator(_, value) {
                //     const { getFieldValue } = _v;
                //     console.log("@_v", _v, _v2);
                //     console.log("@_", _);
                //     console.log("@_value", value);
                //     console.log("@getFieldValue password", getFieldValue("password"));
                //     // console.log(value);

                //     // if (!value || getFieldValue("password") === value) {
                //     //   return Promise.resolve();
                //     // }
                //     // return Promise.reject(
                //     //   new Error(
                //     //     "The two passwords that you entered do not match!"
                //     //   )
                //     // );
                //     return Promise.resolve();
                //   },
                // }),
                {
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(new Error("请输入密码"));
                    }
                    if (value.length < 4 || value.length > 12) {
                      return Promise.reject(new Error("密码长度在4-12位之间"));
                    }
                    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                      return Promise.reject(
                        new Error("密码只能由数字、字母和下划线组成")
                      );
                    }
                    return Promise.resolve();
                  },
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
              <Button
                type="default"
                onClick={this.resetForm}
                className="reset-form"
              >
                重置
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
