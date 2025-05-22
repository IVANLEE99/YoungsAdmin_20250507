import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input, Select } from "antd";
export default class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setFormRef: PropTypes.func.isRequired,
  };
  formRef = React.createRef();
  componentDidMount() {
    this.props.setFormRef(this.formRef);
  }
  render() {
    return (
      <div>
        <Form layout="vertical" ref={this.formRef} preserve={false}>
          <Form.Item
            label="分类名称"
            name="name"
            rules={[{ required: true, message: "请输入分类名称" }]}
          >
            <Input defaultValue={this.props.categoryName} />
          </Form.Item>
        </Form>
      </div>
    );
  }
}
