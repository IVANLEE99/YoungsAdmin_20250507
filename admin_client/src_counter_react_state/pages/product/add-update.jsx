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
import { addProduct, updateProduct } from "../../api/product";
import LinkButton from "../../components/linkButton";
import { getCategoryList } from "../../api/category";
const { TextArea } = Input;
export default class AddUpdate extends Component {
  static propTypes = {};
  product = {};
  state = {
    initialValues: {},
    product: {},
    optionLists: [],
  };
  formRef = React.createRef();
  pictureWallRef = React.createRef();
  richTextEditorRef = React.createRef();
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
      .then(async (value) => {
        const imgs = this.pictureWallRef?.current?.getImgList();
        const detail = this.richTextEditorRef?.current?.getDetail();
        let product = {
          imgs,
          name: value.name,
          desc: value.desc,
          price: value.price,
          detail,
          pCategoryId:
            value.categoryIds.length > 1 ? value.categoryIds[0] : "0",
          categoryId:
            value.categoryIds.length > 1
              ? value.categoryIds[1]
              : value.categoryIds[0],
        };
        let err, res;
        if (this.isUpdate) {
          product._id = this.product._id;
          [err, res] = await updateProduct(product);
        } else {
          [err, res] = await addProduct(product);
        }
        if (err) {
          message.error(err.message || err.msg);
          return;
        }
        if (res.status === 0) {
          message.success(this.isUpdate ? "编辑成功" : "添加成功");
          this.props.navigate(-1);
        } else {
          message.error(this.isUpdate ? "编辑失败" : "添加失败");
        }
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
    const {
      name,
      desc,
      price,
      imgs,
      detail = "",
      pCategoryId,
      categoryId,
    } = product;
    console.log("detail---", detail);
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
              <Input placeholder="请输入商品名称" />
            </Form.Item>
            <Form.Item
              label="商品描述"
              name="desc"
              rules={[{ required: true, message: "商品描述不能为空" }]}
              validateTrigger={["onBlur", "onChange"]}
            >
              <TextArea
                placeholder="请输入商品描述"
                autoSize={{ minRows: 2 }}
              />
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
                placeholder="请输入商品价格"
              />
            </Form.Item>
            <Form.Item label="商品分类" name="categoryIds">
              <Cascader
                options={this.state.optionLists}
                loadData={this.loadData}
                onChange={this.onChange}
                changeOnSelect
                placeholder="请选择商品分类"
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
              <RichTextEditor detail={detail} ref={this.richTextEditorRef} />
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
