import React, { Component } from "react";
import { Card, Space, message } from "antd";
import { List } from "antd";
import { getProductDetail } from "../../api/product";
import { BASE_IMG_URL } from "../../utils/constant";
import { getCategoryInfo } from "../../api/category";
import LinkButton from "../../components/linkButton";

export default class Detail extends Component {
  state = {
    cName1: "",
    cName2: "",
  };
  componentDidMount() {
    // this.getProductDetail();
    const { pCategoryId, categoryId } = this.props.location.state.product;
    if (pCategoryId === "0") {
      getCategoryInfo(categoryId)
        .then(([err, res]) => {
          if (err) {
            console.error(err);
            message.error("获取分类信息失败");
          } else {
            this.setState({ cName1: res.data.name });
          }
        })
        .catch((err) => {
          console.error(err);
          message.error("获取分类信息失败");
        });
    } else {
      getCategoryInfo(pCategoryId)
        .then(([err, res]) => {
          if (err) {
            console.error(err);
            message.error("获取分类信息失败");
          } else {
            this.setState({ cName1: res.data.name });
          }
        })
        .catch((err) => {
          console.error(err);
          message.error("获取分类信息失败");
        });
      getCategoryInfo(categoryId)
        .then(([err, res]) => {
          if (err) {
            console.error(err);
            message.error("获取分类信息失败");
          } else {
            this.setState({ cName2: res.data.name });
          }
        })
        .catch((err) => {
          console.error(err);
          message.error("获取分类信息失败");
        });
    }
  }
  getProductDetail = async () => {
    const result = await getProductDetail(this.props.productId);
    this.setState({ productDetail: result.data });
  };
  render() {
    const { product } = this.props.location.state;
    console.log(product);
    const { name, desc, price, imgs, detail, categoryId } = product;
    const { cName1, cName2 } = this.state;
    const title = (
      <h1>
        <LinkButton onClick={() => this.props.navigate(-1)}>⬅️</LinkButton>
        商品详情
      </h1>
    );
    return (
      <div>
        <Card title={title}>
          <List>
            <List.Item>
              <div>
                <span>商品名称：</span>
                <span>{name}</span>
              </div>
            </List.Item>
            <List.Item>
              <div>
                <span>商品描述：</span>
                <span>{desc}</span>
              </div>
            </List.Item>
            <List.Item>
              <div>
                <span>商品价格：</span>
                <span>{price}</span>
              </div>
            </List.Item>
            <List.Item>
              <div>
                <span>所属分类：</span>
                <span>
                  {cName1} {cName2 ? " / " + cName2 : ""}
                </span>
              </div>
            </List.Item>
            <List.Item>
              <div>
                <span>商品图片：</span>
                <span>
                  {imgs.map((img) => (
                    <img
                      src={BASE_IMG_URL + img}
                      alt="商品图片"
                      style={{ width: 100, height: 100 }}
                    />
                  ))}
                </span>
              </div>
            </List.Item>
            <List.Item>
              <div>
                <span>详情：</span>
                <span dangerouslySetInnerHTML={{ __html: detail }} />
              </div>
            </List.Item>
          </List>
        </Card>
      </div>
    );
  }
}
