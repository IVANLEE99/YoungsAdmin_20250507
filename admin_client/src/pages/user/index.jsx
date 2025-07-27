import React, { Component } from "react";
import { Card, Space, message } from "antd";
import "./index.less";
import LinkButton from "../../components/linkButton";
import { PlusOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Form, Input } from "antd";
import { getUserList, updateUser, addUser, deleteUser } from "../../api/user";
import UserForm from "./UserForm";
import UpdateUserForm from "./UpdateUserForm";
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
                  currentUser: record,
                });
              }}
            >
              修改
            </LinkButton>
            <LinkButton onClick={() => this.deleteUser(record)}>
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
  // 获取用户列表
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
  // 删除用户
  deleteUser = async (user) => {
    let fn = async () => {
      const [err, res] = await deleteUser(user._id);
      if (err) {
        message.error(err.message || err.msg);
      } else if (res.status === 0) {
        message.success("删除成功");
        this.getUserList();
      }
    };
    Modal.confirm({
      title: "提示",
      content: `确定要删除该用户吗？${user.username}`,
      onOk: fn,
    });
  };
  // 添加用户
  addUser = async (user) => {
    const [err, res] = await addUser(user);
    if (err) {
      message.error(err.message || err.msg);
    } else if (res.status === 0) {
      message.success("添加成功");
      this.setState({ isShowAddModal: false });
      this.getUserList();
    }
  };
  // 获取用户列表
  componentDidMount() {
    this.getUserList();
  }
  handleAddOk = async () => {
    let fn = async (values) => {
      console.log("handleAddOk", values);
      const [err, res] = await addUser({
        username: values.username,
        password: values.password,
        role_id: values.role_id,
        phone: values.phone,
        email: values.email,
      });
      if (err) {
        message.error(err.message || err.msg);
      } else if (res.status === 0) {
        message.success("添加成功");
        this.setState({ isShowAddModal: false });
        this.getUserList();
      } else {
        message.error(res.msg);
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
      const [err, res] = await updateUser({
        _id: this.state.currentUser._id,
        username: values.username,
        role_id: values.role_id,
        phone: values.phone,
        email: values.email,
      });
      if (err) {
        message.error(err.message);
      } else if (res.status === 0) {
        message.success("更新成功");
        this.setState({ isShowUpdateModal: false });
        this.getUserList();
      } else {
        message.error(res.msg);
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
    const title = <h1>用户列表</h1>;
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
          title="添加用户"
          closable={{ "aria-label": "Custom Close Button" }}
          destroyOnClose={true}
          open={this.state.isShowAddModal}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
        >
          <UserForm
            setFormRef={(formRef) => (this.addFormRef = formRef)}
            roleList={roleList}
          />
        </Modal>
        <Modal
          title="更新用户"
          closable={{ "aria-label": "Custom Close Button" }}
          destroyOnClose={true}
          open={this.state.isShowUpdateModal}
          onOk={this.handleUpdateOk}
          onCancel={this.handleUpdateCancel}
        >
          <UpdateUserForm
            handleUpdateOk={this.handleUpdateOk}
            setFormRef={(formRef) => (this.updateFormRef = formRef)}
            roleList={roleList}
            user={this.state.currentUser}
          />
        </Modal>
      </div>
    );
  }
}
