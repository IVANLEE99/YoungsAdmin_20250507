import React, { Component } from "react";
import { Form, Input, Tree } from "antd";
import PropTypes from "prop-types";
import menuList from "../../config/menuConfig";

export default class AddForm extends Component {
  static propTypes = {
    setFormRef: PropTypes.func.isRequired,
    role: PropTypes.object.isRequired,
  };
  treeData = [
    {
      title: "平台权限",
      key: "all",
      disabled: false,
      children: menuList
        ? menuList.map((item) => {
            return {
              title: item.title,
              key: item.key,
              disabled: false,
              children: item.children
                ? item.children.map((child) => ({
                    title: child.title,
                    key: child.key,
                    disabled: false,
                  }))
                : null,
            };
          })
        : null,
    },
  ];
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
          disabled={true}
          initialValues={{
            roleName: this.props.role.name,
          }}
        >
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[{ required: true, message: "请输入角色名称" }]}
          >
            <Input />
          </Form.Item>
        </Form>
        <Tree checkable defaultExpandAll treeData={this.treeData} />
      </div>
    );
  }
}
