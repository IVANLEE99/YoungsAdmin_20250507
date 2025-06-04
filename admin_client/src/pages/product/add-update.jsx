import React, { Component } from "react";
import { Card, Form, Input, Button, message, Upload, InputNumber } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { addProduct } from "../../api/product";
import LinkButton from "../../components/linkButton";
const { TextArea } = Input;
export default class AddUpdate extends Component {
  static propTypes = {};
  formRef = React.createRef();
  componentDidMount() {}
  handleSubmit = () => {
    this.formRef.current.submit();
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
              商品分类
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
