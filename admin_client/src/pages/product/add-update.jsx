import React, { Component } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  message,
  Upload,
  InputNumber,
  Cascader,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { addProduct } from "../../api/product";
import LinkButton from "../../components/linkButton";
import { getCategoryList } from "../../api/category";
const { TextArea } = Input;
export default class AddUpdate extends Component {
  static propTypes = {};
  state = {
    optionLists: [
      {
        value: "zhejiang",
        label: "Zhejiang",
        isLeaf: false,
      },
      {
        value: "jiangsu",
        label: "Jiangsu",
        isLeaf: false,
      },
    ],
  };
  formRef = React.createRef();
  getCategoryList = async (parentId = "0") => {
    const [err, res] = await getCategoryList(parentId);
    console.log(err, res);
    if (err) {
      message.error(err.message || err.msg);
      return;
    }
    if (res.status === 0) {
      if (parentId === "0") {
        this.initOptionLists(res.data);
      } else {
        return res.data || "";
      }
    }
  };
  initOptionLists = (data) => {
    const optionLists = data.map((item) => ({
      value: item._id,
      label: item.name,
      isLeaf: false,
    }));
    this.setState({
      optionLists,
    });
  };
  componentDidMount() {
    this.getCategoryList();
  }
  handleSubmit = () => {
    this.formRef.current.submit();
  };
  loadData = async (selectedOptions) => {
    // console.log(selectedOptions);
    const targetOption = selectedOptions[selectedOptions.length - 1];

    let children = await this.getCategoryList(targetOption.value);
    if (children && children.length > 0) {
      targetOption.children = children.map((i) => {
        return {
          label: i.name,
          value: i._id,
          isLeaf: false,
        };
      });
    } else {
      targetOption.isLeaf = true;
    }
    this.setState({
      optionLists: [...this.state.optionLists],
    });

    // // load options lazily
    // setTimeout(() => {
    //   targetOption.children = [
    //     {
    //       label: `${targetOption.label} Dynamic 1`,
    //       value: "dynamic1",
    //     },
    //     {
    //       label: `${targetOption.label} Dynamic 2`,
    //       value: "dynamic2",
    //     },
    //   ];
    //   this.setState({
    //     optionLists: [...this.state.optionLists],
    //   });
    // }, 1000);
  };
  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 8 },
    };
    const title = (
      <h1>
        <LinkButton onClick={() => this.props.navigate(-1)}>⬅️</LinkButton>
        添加商品
      </h1>
    );
    return (
      <div>
        <Card title={title}>
          <Form {...formItemLayout} ref={this.formRef}>
            <Form.Item
              label="商品名称"
              name="name"
              rules={[{ required: true, message: "商品名称不能为空" }]}
              validateTrigger={["onBlur", "onChange"]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="商品描述"
              name="desc"
              rules={[{ required: true, message: "商品描述不能为空" }]}
              validateTrigger={["onBlur", "onChange"]}
            >
              <TextArea autoSize={{ minRows: 2 }} />
            </Form.Item>
            <Form.Item
              label="商品价格"
              name="price"
              rules={[{ required: true, message: "商品价格不能为空" }]}
              validateTrigger={["onBlur", "onChange"]}
            >
              <InputNumber
                addonAfter="元"
                min={0.01}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="商品分类" name="categoryId">
              <Cascader
                options={this.state.optionLists}
                loadData={this.loadData}
                onChange={this.onChange}
                changeOnSelect
              />
            </Form.Item>
            <Form.Item label="商品图片" name="imgs">
              商品图片
            </Form.Item>
            <Form.Item label="商品详情" name="detail">
              商品详情
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 3 }}>
              <Button type="primary" onClick={this.handleSubmit}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
