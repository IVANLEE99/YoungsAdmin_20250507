import React, { Component } from "react";
import { Card, Form, Input, Button, message, Upload, InputNumber } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { addProduct } from "../../api/product";
import LinkButton from "../../components/linkButton";
const { TextArea } = Input;
export default class AddUpdate extends Component {
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
          <Form {...formItemLayout}>
            <Form.Item
              label="商品名称"
              name="productName"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="商品描述"
              name="productDesc"
              rules={[{ required: true }]}
            >
              <TextArea autoSize={{ minRows: 2 }} />
            </Form.Item>
            <Form.Item
              label="商品价格"
              name="productPrice"
              rules={[{ required: true }]}
            >
              <InputNumber addonAfter="元" min={0} style={{ width: "100%" }} />
            </Form.Item>
            {/* <Form.Item label="商品图片" name="productImg">
              <Upload>
                <Button icon={<UploadOutlined />}>上传图片</Button>
              </Upload>
            </Form.Item> */}
          </Form>
        </Card>
      </div>
    );
  }
}
