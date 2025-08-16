import React, { Component } from "react";
import { Form, Input, Tree } from "antd";
import PropTypes from "prop-types";
import menuList from "../../config/menuConfig";

export default class AddForm extends Component {
  static propTypes = {
    setFormRef: PropTypes.func.isRequired,
    role: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      checkedKeys: [],
    };
    this.formRef = React.createRef();
    this.treeData = [
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
    let { menus } = this.props.role;
    if (menus) {
      console.log("menus", menus);
      this.state.checkedKeys = menus;
    }
  }
  getMenus = () => this.state.checkedKeys;
  render() {
    console.log("this.state.checkedKeys", this.state.checkedKeys);
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
        <Tree
          checkable
          defaultExpandAll
          treeData={this.treeData}
          checkedKeys={this.state.checkedKeys}
          onCheck={(checkedKeys) => this.setState({ checkedKeys })}
        />
      </div>
    );
  }
}
