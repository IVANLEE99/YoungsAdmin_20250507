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
import { getRoleList } from "../../api/role";
import { PAGE_SIZE } from "../../utils/constant";

export default class Role extends Component {
  state = {
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
  getRoleList = async (pageNum = 1) => {
    // this.setState({ isLoading: true });
    // const [err, res] = await getRoleList(pageNum);
    // this.setState({ isLoading: false });
    const [err, res] = await getRoleList();
    if (res && res.status === 0) {
      this.setState({ roles: res.data });
    } else {
      message.error(res.message || err.message);
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
        <Button type="primary">添加角色</Button>
        <Button type="primary" disabled>
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
      </div>
    );
  }
}
