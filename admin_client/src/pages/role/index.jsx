import React, { Component } from "react";
import "./index.less";
import {
  Card,
  Button,
  Table,
  message,
  Modal,
  Select,
  Input,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LinkButton from "../../components/linkButton";
import AddForm from "./addForm";
import AuthForm from "./authForm";
import { getRoleList, addRole, updateRole } from "../../api/role";
import { PAGE_SIZE } from "../../utils/constant";

export default class Role extends Component {
  state = {
    isShowAddModal: false,
    isShowAuthModal: false,
    roles: [
      // {
      //   menus: ["/role", "/charts/bar", "/home", "/category", "/user"],
      //   _id: "5ca9eaa1b49ef916541160d3",
      //   name: "测试",
      //   create_time: 1554639521749,
      //   __v: 0,
      //   auth_time: 1559469116470,
      //   auth_name: "admin",
      // },
      // {
      //   menus: ["/charts/bar", "/home", "/category", "/user"],
      //   _id: "5ca9eaa1b49ef916541160d4",
      //   name: "2测试2",
      //   create_time: 1554639521758,
      //   __v: 0,
      //   auth_time: 1559469116490,
      //   auth_name: "admin3",
      // },
    ],
    selectedRole: {},
    columns: [
      {
        title: "角色名称",
        dataIndex: "name",
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
      },
      {
        title: "授权人",
        dataIndex: "auth_name",
      },
    ],
    isLoading: false,
    selectedRowKeys: [],
  };
  addFormRef = React.createRef();
  authFormRef = React.createRef();
  handleAddOk = async () => {
    let fn = async (values) => {
      console.log("values", values);
      let { roleName } = values;
      let [err, res] = await addRole(roleName);
      if (res && res.status === 0) {
        message.success("添加成功");
        this.setState({ isShowAddModal: false });
        this.setState((state, props) => ({
          roles: [...state.roles, res.data],
        }));
        this.addFormRef.current.resetFields();
      } else {
        message.error(res.message || err?.message);
      }

      // console.log("handleAddOk");
      // const [err, res] = await addCategory({
      //   categoryName: values.name,
      //   parentId: values.parentId,
      // });
      // if (err) {
      //   message.error(err.message || err.msg);
      // } else if (res.status === 0) {
      //   message.success("添加成功");
      //   this.setState({ isShowAddModal: false });
      //   //二级选一级添加
      //   if (
      //     this.state.parentId !== "0" &&
      //     values.parentId !== this.state.parentId
      //   ) {
      //     this.getCategoryList("0");
      //   }
      //   //一级选二级添加
      //   if (
      //     this.state.parentId === "0" &&
      //     values.parentId !== this.state.parentId
      //   ) {
      //     let { categoryList = [] } = this.state;
      //     const target = categoryList.find(
      //       (item) => item._id === values.parentId
      //     );
      //     if (target) {
      //       this.showSubCategory(target);
      //     }
      //   } else if (values.parentId === this.state.parentId) {
      //     this.getCategoryList();
      //   }
      // }
    };
    this.addFormRef?.current
      ?.validateFields()
      .then(fn)
      .catch((err) => {
        console.error("err", err);
      });
  };
  handleAddCancel = () => {
    console.log("handleAddCancel");
    this.setState({ isShowAddModal: false });
    this.addFormRef.current.resetFields();
  };
  handleAuthOk = async () => {
    console.log("handleAuthOk");
    this.setState({ isShowAuthModal: false });
    // this.authFormRef.current.resetFields();
    let menus = this.authFormRef.current.getMenus();
    let [err, res] = await updateRole({
      ...this.state.selectedRole,
      menus,
    });
    if (res && res.status === 0) {
      message.success("设置成功");
      this.setState({
        roles: this.state.roles.map((role) => {
          if (role._id === this.state.selectedRole._id) {
            return res.data;
          }
          return role;
        }),
      });
      this.setState({ selectedRole: res.data });
    } else {
      message.error(res?.message || res?.msg || err?.message || err?.msg);
    }
  };
  handleAuthCancel = () => {
    console.log("handleAuthCancel");
    this.setState({ isShowAuthModal: false });
    // this.authFormRef.current.resetFields();
  };
  getRoleList = async (pageNum = 1) => {
    // this.setState({ isLoading: true });
    // const [err, res] = await getRoleList(pageNum);
    // this.setState({ isLoading: false });
    const [err, res] = await getRoleList();
    if (res && res.status === 0) {
      this.setState({ roles: res.data });
    } else {
      message.error(res?.message || res?.msg || err?.message || err?.msg);
    }
  };
  componentDidMount() {
    this.getRoleList();
  }
  onChange = (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
    this.setState({ selectedRole: selectedRows[0] });
  };
  render() {
    const title = (
      <Space>
        <Button
          type="primary"
          onClick={() => this.setState({ isShowAddModal: true })}
        >
          添加角色
        </Button>
        <Button
          type="primary"
          disabled={!this.state.selectedRole._id}
          onClick={() => this.setState({ isShowAuthModal: true })}
        >
          设置角色权限
        </Button>
      </Space>
    );
    const rowSelection = {
      type: "radio",
      selectedRowKeys: [this.state.selectedRole._id || ""],
      onChange: this.onChange,
    };
    return (
      <div>
        <Card title={title}>
          <Table
            bordered
            rowKey="_id"
            dataSource={this.state.roles}
            columns={this.state.columns}
            loading={this.state.isLoading}
            rowSelection={rowSelection}
            onRow={(record) => {
              return {
                onClick: () => {
                  this.setState({ selectedRole: record });
                },
              };
            }}
            pagination={{
              pageSize: PAGE_SIZE,
              total: this.state.total,
              showTotal: (total) => `共${total}条`,
              showQuickJumper: true,
            }}
          />
        </Card>
        <Modal
          title="添加角色"
          closable={{ "aria-label": "Custom Close Button" }}
          destroyOnClose={true}
          open={this.state.isShowAddModal}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
        >
          <AddForm setFormRef={(formRef) => (this.addFormRef = formRef)} />
        </Modal>
        <Modal
          title="设置角色权限"
          closable={{ "aria-label": "Custom Close Button" }}
          destroyOnClose={true}
          open={this.state.isShowAuthModal}
          onOk={this.handleAuthOk}
          onCancel={this.handleAuthCancel}
        >
          <AuthForm ref={this.authFormRef} role={this.state.selectedRole} />
        </Modal>
      </div>
    );
  }
}
