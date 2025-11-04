import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";
export default class AddForm extends Component {
  static propTypes = {
    setFormRef: PropTypes.func.isRequired,
    roleList: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
  };
  formRef = React.createRef();
  componentDidMount() {
    this.props.setFormRef(this.formRef);
  }
  render() {
    return (
      <div>
        {/* |参数		|是否必选 |类型     |说明
	|username    |Y       |string   |用户名
	|password    |Y       |string   |密码
	|phone       |N       |string   |手机号
	|email       |N       |string   |邮箱
	|role_id     |N       |string   |角色ID */}
        <Form
          ref={this.formRef}
          preserve={false}
          onFinish={(values) => this.props.handleAddOk(values)}
          labelAlign="left"
          initialValues={this.props.user || {}}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: "请输入手机号" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: "请输入邮箱" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="角色"
            name="role_id"
            rules={[{ required: true, message: "请输入角色" }]}
          >
            <Select>
              {this.props.roleList.map((role) => (
                <Select.Option key={role._id} value={role._id}>
                  {role.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
