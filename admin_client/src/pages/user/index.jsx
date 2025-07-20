import React, { Component } from "react";
import { Card, Space, message } from "antd";
import "./index.less";
import LinkButton from "../../components/linkButton";
import { PlusOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Form, Input } from "antd";
import { getUserList, updateUser, addUser, deleteUser } from "../../api/user";
import AddForm from "./addForm";
import UpdateForm from "./updateForm";
import { formatDate } from "../../utils/dateUtils";
export default class Category extends Component {
  state = {
    userList: [],
    roleList: [],
    columns: [
      {
        title: "用户名",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "邮箱",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "电话",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "注册时间",
        dataIndex: "create_time",
        key: "create_time",
        render: (create_time) => formatDate(create_time),
      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        key: "role_id",
        render: (role_id) => this.roleNamesMap[role_id],
      },
      {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        width: 300,
        render: (value, record, index) => (
          <div>
            <LinkButton
              onClick={() => {
                this.setState({
                  isShowUpdateModal: true,
                  currentCategory: record,
                });
              }}
            >
              修改
            </LinkButton>
            <LinkButton onClick={() => this.deleteUser(record._id)}>
              删除
            </LinkButton>
          </div>
        ),
      },
    ],
    isLoading: false,
    isShowAddModal: false,
    isShowUpdateModal: false,
  };
  getUserList = async () => {
    this.setState({ isLoading: true });
    const [err, res] = await getUserList();
    this.setState({ isLoading: false });
    console.log(err, res);
    if (err) {
      message.error(err.message || err.msg);
    } else {
      let { users = [], roles = [] } = res.data;
      this.setState({
        userList: users,
        roleList: roles,
      });
      this.roleNamesMap = roles.reduce((acc, role) => {
        acc[role._id] = role.name;
        return acc;
      }, {});
    }
  };
  // 获取分类列表
  componentDidMount() {
    this.getUserList();
  }
  handleAddOk = async () => {
    let fn = async (values) => {
      console.log("handleAddOk");
      const [err, res] = await addUser({
        username: values.username,
        password: values.password,
        roleId: values.roleId,
      });
      if (err) {
        message.error(err.message || err.msg);
      } else if (res.status === 0) {
        message.success("添加成功");
        this.setState({ isShowAddModal: false });

        //二级选一级添加
        if (
          this.state.parentId !== "0" &&
          values.parentId !== this.state.parentId
        ) {
          this.getCategoryList("0");
        }
        //一级选二级添加
        if (
          this.state.parentId === "0" &&
          values.parentId !== this.state.parentId
        ) {
          let { categoryList = [] } = this.state;
          const target = categoryList.find(
            (item) => item._id === values.parentId
          );
          if (target) {
            this.showSubCategory(target);
          }
        } else if (values.parentId === this.state.parentId) {
          this.getCategoryList();
        }
      }
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
  };
  handleUpdateOk = async () => {
    console.log("handleUpdateOk");
    let fn = async (values) => {
      const username = values.username;
      console.log("username", username);
      const [err, res] = await updateUser({
        userId: this.state.currentUser._id,
        username,
      });
      if (err) {
        message.error(err.message);
      } else if (res.status === 0) {
        message.success("更新成功");
        this.setState({ isShowUpdateModal: false });
        this.getUserList();
      }
    };
    this.updateFormRef?.current
      ?.validateFields()
      .then(fn)
      .catch((err) => {
        console.error("err", err);
      });
  };
  handleUpdateCancel = () => {
    this.setState({ isShowUpdateModal: false });
    console.log("handleUpdateCancel");
  };
  render() {
    const { isLoading } = this.state;
    const title =
      this.state.parentId === "0" ? (
        <h1>用户列表</h1>
      ) : (
        <span>
          <LinkButton
            onClick={() =>
              this.setState({
                parentId: "0",
                parentName: "",
                subCategoryList: [],
              })
            }
          >
            用户列表
          </LinkButton>
          <span> -- {this.state.parentName}</span>
        </span>
      );
    const extra = (
      <LinkButton onClick={() => this.setState({ isShowAddModal: true })}>
        <PlusOutlined />
        添加用户
      </LinkButton>
    );
    const { userList, roleList, columns } = this.state;
    return (
      <div className="category">
        <Card title={title} extra={extra} style={{ width: "100%" }}>
          <Table
            bordered
            rowKey="key"
            dataSource={userList}
            columns={columns}
            loading={isLoading}
            pagination={{
              pageSize: 10,
              showTotal: (total) => `共${total}条`,
              showQuickJumper: true,
            }}
          />
        </Card>
        <Modal
          title="添加分类"
          closable={{ "aria-label": "Custom Close Button" }}
          destroyOnClose={true}
          open={this.state.isShowAddModal}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
        >
          {/* <AddForm
            setFormRef={(formRef) => (this.addFormRef = formRef)}
            categoryList={categoryList}
            parentId={this.state.parentId}
          /> */}
        </Modal>
        <Modal
          title="更新分类"
          closable={{ "aria-label": "Custom Close Button" }}
          destroyOnClose={true}
          open={this.state.isShowUpdateModal}
          onOk={this.handleUpdateOk}
          onCancel={this.handleUpdateCancel}
        >
          {/* <UpdateForm
            handleUpdateOk={this.handleUpdateOk}
            setFormRef={(formRef) => (this.updateFormRef = formRef)}
            username={this.state.currentUser.username}
          /> */}
        </Modal>
      </div>
    );
  }
}
