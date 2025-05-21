import React, { Component } from "react";
import { Card, Space, message } from "antd";
import "./index.less";
import LinkButton from "../../components/linkButton";
import { PlusOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Form, Input } from "antd";
import {
  getCategoryList,
  updateCategory,
  addCategory,
} from "../../api/category";
import AddForm from "./addForm";
import UpdateForm from "./updateForm";
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
            <LinkButton
              onClick={() => {
                this.setState({
                  isShowUpdateModal: true,
                  currentCategory: record,
                });
              }}
            >
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
    isShowAddModal: false,
    isShowUpdateModal: false,
    currentCategory: {},
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
      message.error(err.message || err.msg);
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
  handleAddOk = async () => {
    console.log("handleAddOk");
    const values = this.addFormRef?.current?.getFieldsValue();
    console.log("values", values);
    const [err, res] = await addCategory({
      categoryName: values.name,
      parentId: values.parentId,
    });
    if (err) {
      message.error(err.message || err.msg);
    } else if (res.status === 0) {
      message.success("添加成功");
      this.setState({ isShowAddModal: false });
      if (values.parentId !== this.state.parentId) {
        let { categoryList = [] } = this.state;
        const target = categoryList.find(
          (item) => item._id === values.parentId
        );
        if (target) {
          this.showSubCategory(target);
        }
      } else {
        this.getCategoryList();
      }
    }
  };
  handleAddCancel = () => {
    console.log("handleAddCancel");
    this.setState({ isShowAddModal: false });
  };
  handleUpdateOk = async () => {
    console.log("handleUpdateOk");
    const categoryName = this.updateFormRef?.current?.getFieldValue("name");
    console.log("categoryName", categoryName);
    const [err, res] = await updateCategory({
      categoryId: this.state.currentCategory._id,
      categoryName,
    });
    if (err) {
      message.error(err.message);
    } else if (res.status === 0) {
      message.success("更新成功");
      this.setState({ isShowUpdateModal: false });
      this.getCategoryList();
    }
  };
  handleUpdateCancel = () => {
    this.setState({ isShowUpdateModal: false });
    console.log("handleUpdateCancel");
  };
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
      <LinkButton onClick={() => this.setState({ isShowAddModal: true })}>
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
        <Modal
          title="添加分类"
          closable={{ "aria-label": "Custom Close Button" }}
          destroyOnClose={true}
          open={this.state.isShowAddModal}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
        >
          <AddForm
            setFormRef={(formRef) => (this.addFormRef = formRef)}
            categoryList={categoryList}
            parentId={this.state.parentId}
          />
        </Modal>
        <Modal
          title="更新分类"
          closable={{ "aria-label": "Custom Close Button" }}
          destroyOnClose={true}
          open={this.state.isShowUpdateModal}
          onOk={this.handleUpdateOk}
          onCancel={this.handleUpdateCancel}
        >
          <UpdateForm
            handleUpdateOk={this.handleUpdateOk}
            setFormRef={(formRef) => (this.updateFormRef = formRef)}
            categoryName={this.state.currentCategory.name}
          />
        </Modal>
      </div>
    );
  }
}
