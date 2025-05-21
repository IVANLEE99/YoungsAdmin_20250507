import React, { Component } from "react";
import { Form, Input, Select } from "antd";
export default class AddForm extends Component {
  formRef = React.createRef();
  render() {
    return (
      <div>
        <Form
          layout="vertical"
          ref={this.formRef}
          onFinish={(values) => this.props.handleAddOk(values)}
        >
          <Form.Item label="所属分类" name="parentId">
            <Select>
              <Select.Option value="0">一级分类</Select.Option>
              <Select.Option value="1">二级分类</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="分类名称" name="name">
            <Input />
          </Form.Item>
        </Form>
      </div>
    );
  }
}
