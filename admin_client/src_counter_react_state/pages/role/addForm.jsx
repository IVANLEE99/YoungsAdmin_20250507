import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";
export default class AddForm extends Component {
  static propTypes = {
    setFormRef: PropTypes.func.isRequired,
  };
  formRef = React.createRef();
  componentDidMount() {
    this.props.setFormRef(this.formRef);
  }
  render() {
    return (
      <div>
        <Form
          ref={this.formRef}
          preserve={false}
          onFinish={(values) => this.props.handleAddOk(values)}
        >
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[{ required: true, message: "请输入角色名称" }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="角色描述"
            name="roleDesc"
            rules={[{ required: true, message: "请输入角色描述" }]}
          >
            <Input />
          </Form.Item> */}
        </Form>
      </div>
    );
  }
}
