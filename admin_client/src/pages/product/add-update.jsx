import PictureWall from "./picture-wall";
import RichTextEditor from "./rich-text-editor";
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
    initialValues: {},
    product: {},
    optionLists: [],
  };
  formRef = React.createRef();
  pictureWallRef = React.createRef();
  getCategoryList = async (parentId = "0") => {
    const [err, res] = await getCategoryList(parentId);
    console.log("getCategoryList", err, res);
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
  initOptionLists = async (data) => {
    const optionLists = data.map((item) => ({
      value: item._id,
      label: item.name,
      isLeaf: false,
    }));
    const { isUpdate, product } = this;
    const { pCategoryId, categoryId } = product;
    if (isUpdate && pCategoryId !== "0") {
      const targetOption = optionLists.find(
        (item) => item.value === pCategoryId
      );
      if (targetOption) {
        const children = await this.getCategoryList(pCategoryId);
        targetOption.children = children.map((i) => {
          return {
            label: i.name,
            value: i._id,
            isLeaf: false,
          };
        });
      }
    }
    this.setState({
      optionLists,
    });
  };
  async componentDidMount() {
    const product = this.props?.location?.state?.product || {};
    console.log("product", product);
    if (product._id) {
      this.setState({
        product,
      });
      this.product = product;
      this.isUpdate = true;
    } else {
      this.isUpdate = false;
    }
    await this.getCategoryList();
    if (this.isUpdate) {
      const { name, desc, price, imgs, detail, pCategoryId, categoryId } =
        this.product;
      let categoryIds = [];
      if (pCategoryId !== "0") {
        categoryIds.push(pCategoryId);
      }
      if (categoryId) {
        categoryIds.push(categoryId);
      }
      this.setState(
        {
          initialValues: {
            name,
            desc,
            price,
            imgs,
            detail,
            categoryIds: this.isUpdate ? categoryIds : [],
          },
        },
        () => {
          this.formRef?.current?.setFieldsValue(this.state.initialValues);
        }
      );
    }
  }
  handleSubmit = () => {
    this.formRef?.current
      ?.validateFields()
      .then((value) => {
        console.log(value);
        console.log("this.pictureWallRef", this.pictureWallRef);
        const imgs = this.pictureWallRef?.current?.getImgList();

        console.log("imgs", imgs);
      })
      .catch((err) => {
        console.error("err", err);
      });
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
        {this.isUpdate ? "编辑商品" : "添加商品"}
      </h1>
    );
    const { product, initialValues } = this.state;
    const { name, desc, price, imgs, detail, pCategoryId, categoryId } =
      product;
    return (
      <div>
        <Card title={title}>
          <Form
            {...formItemLayout}
            ref={this.formRef}
            initialValues={initialValues}
          >
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
            <Form.Item label="商品分类" name="categoryIds">
              <Cascader
                labelInValue
                options={this.state.optionLists}
                loadData={this.loadData}
                onChange={this.onChange}
                changeOnSelect
              />
            </Form.Item>
            <Form.Item label="商品图片" name="imgs">
              <PictureWall ref={this.pictureWallRef} imgs={imgs} />
            </Form.Item>
            <Form.Item
              label="商品详情"
              name="detail"
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 20 }}
            >
              <RichTextEditor detail={detail} />
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
