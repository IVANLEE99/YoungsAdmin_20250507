import React, { Component } from "react";
import { Card, Space, message } from "antd";
import "./index.less";
import LinkButton from "../../components/linkButton";
import { PlusOutlined } from "@ant-design/icons";
import { Table, Button } from "antd";
import { getCategoryList } from "../../api/category";
export default class Category extends Component {
  state = {
    categoryList: [
      // {
      //   key: "1",
      //   name: "分类名称1",
      //   age: 32,
      //   address: "西湖区湖底公园1号",
      // },
      // {
      //   key: "2",
      //   name: "分类名称2",
      //   age: 42,
      //   address: "西湖区湖底公园1号",
      // },
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
        render: (value, record, index) => (
          <div>
            <LinkButton onClick={() => this.showSubCategory(record)}>
              修改分类
            </LinkButton>
            {this.state.parentId === "0" && (
              <LinkButton onClick={() => this.showSubCategory(record)}>
                查看子分类
              </LinkButton>
            )}
          </div>
        ),
      },
    ],
    isLoading: false,
    parentId: "0",
    parentName: "",
    subCategoryList: [],
  };
  showSubCategory = (record) => {
    console.log("record", record);
    this.setState(
      {
        parentId: record._id,
        parentName: record.name,
      },
      () => {
        this.getCategoryList();
      }
    );
  };
  getCategoryList = async () => {
    this.setState({ isLoading: true });
    const [err, res] = await getCategoryList(this.state.parentId);
    this.setState({ isLoading: false });
    console.log(err, res);
    if (err) {
      message.error(err.message);
    } else {
      if (this.state.parentId === "0") {
        this.setState({
          categoryList: res.data,
        });
      } else {
        this.setState({
          subCategoryList: res.data,
        });
      }
    }
  };
  // 获取分类列表
  componentDidMount() {
    this.getCategoryList();
  }

  render() {
    const { isLoading } = this.state;
    const title =
      this.state.parentId === "0" ? (
        <h1>一级分类列表</h1>
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
            一级分类列表
          </LinkButton>
          <span> -- {this.state.parentName}</span>
        </span>
      );
    const extra = (
      <LinkButton>
        <PlusOutlined />
        添加分类
      </LinkButton>
    );
    const { categoryList, subCategoryList, columns } = this.state;
    return (
      <div className="category">
        <Card title={title} extra={extra} style={{ width: "100%" }}>
          <Table
            bordered
            rowKey="key"
            dataSource={
              this.state.parentId === "0" ? categoryList : subCategoryList
            }
            columns={columns}
            loading={isLoading}
          />
        </Card>
      </div>
    );
  }
}
