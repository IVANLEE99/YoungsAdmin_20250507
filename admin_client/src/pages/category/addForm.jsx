import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";
export default class AddForm extends Component {
  static propTypes = {
    categoryList: PropTypes.array.isRequired,
    parentId: PropTypes.string.isRequired,
    setFormRef: PropTypes.func.isRequired,
  };
  formRef = React.createRef();
  componentDidMount() {
    this.props.setFormRef(this.formRef);
  }
  render() {
    const { categoryList = [], parentId = "0" } = this.props;
    return (
      <div>
        <Form
          layout="vertical"
          initialValues={{ parentId }}
          ref={this.formRef}
          preserve={false}
          onFinish={(values) => this.props.handleAddOk(values)}
        >
          <Form.Item label="所属分类" name="parentId">
            <Select>
              <Select.Option value="0">一级分类</Select.Option>
              {categoryList.map((item) => (
                <Select.Option value={item._id} key={item._id}>
                  {item.name}
                </Select.Option>
              ))}
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
