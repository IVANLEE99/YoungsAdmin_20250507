import React, { Component } from "react";
import { Card, Space } from "antd";
import "./index.less";
import LinkButton from "../../components/linkButton";
import { PlusOutlined } from "@ant-design/icons";
import { Table, Button } from "antd";
export default class Category extends Component {
  state = {
    dataSource: [
      {
        key: "1",
        name: "分类名称1",
        age: 32,
        address: "西湖区湖底公园1号",
      },
      {
        key: "2",
        name: "分类名称2",
        age: 42,
        address: "西湖区湖底公园1号",
      },
    ],

    columns: [
      {
        title: "分类名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        width: 300,
        render: () => (
          <div>
            <LinkButton>修改分类</LinkButton>
            <LinkButton>查看子分类</LinkButton>
          </div>
        ),
      },
    ],
  };

  render() {
    const title = <h1>一级分类列表</h1>;
    const extra = (
      <LinkButton>
        <PlusOutlined />
        添加分类
      </LinkButton>
    );
    const { dataSource, columns } = this.state;
    return (
      <div className="category">
        <Card title={title} extra={extra} style={{ width: "100%" }}>
          <Table
            bordered
            rowKey="key"
            dataSource={dataSource}
            columns={columns}
          />
        </Card>
      </div>
    );
  }
}
