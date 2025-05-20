import React, { Component } from "react";
import "./index.less";
import { getIpAreaCoordJson, getWeather } from "../../api/weather";
import getCityId from "../../utils/cityIds";
import { formatDate } from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
import withRouter from "../../utils/withRouter";
import menuList from "../../config/menuConfig";
import { Modal } from "antd";
import storageUtils from "../../utils/storageUtils";
import LinkButton from "../linkButton";

class Header extends Component {
  state = {
    time: formatDate(),
    weather: {},
  };
  componentDidMount() {
    this.getLocation();
    this.getTime();
  }
  getTitle = (menuList) => {
    let path = this.props.location.pathname;
    let title = "";
    for (let i = 0; i < menuList.length; i++) {
      let item = menuList[i];
      if (item.key === path) {
        title = item.title;
        break;
      }
      if (item.children) {
        title = this.getTitle(item.children);
        if (title) {
          break;
        }
      }
    }
    return title;
  };
  // 获取位置
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.fetchWeather(longitude, latitude); // 传给后端
        },
        (error) => {
          console.error("定位失败:", error.message);
          alert("无法获取位置，将使用默认城市");
          this.fetchWeather(); // 使用默认位置
        }
      );
    } else {
      alert("您的浏览器不支持地理定位");
    }
  };
  fetchWeather = async (longitude, latitude) => {
    const [err, res] = await getIpAreaCoordJson({
      coords: `${longitude},${latitude}`,
    });
    console.log(err, res);
    if (res && res.code === 200 && res.data && !res.data.error) {
      let city = res.data.city;
      const cityId = getCityId(city);
      const [err2, res2] = await getWeather({
        cityId,
      });
      if (
        res2 &&
        res2.code === 200 &&
        res2.data &&
        res2.data.value &&
        res2.data.value[0]
      ) {
        this.setState({
          weather: {
            city: res.data.city,
            cityId,
            realtime: res2.data.value[0]?.realtime,
          },
        });
      }
    }
  };
  getTime = () => {
    setInterval(() => {
      this.setState({
        time: formatDate(),
      });
    }, 1000);
  };
  logout = () => {
    Modal.confirm({
      title: "提示",
      content: "确定要退出吗？",
      onOk: () => {
        storageUtils.removeUser();
        // 清除内存中的用户信息
        memoryUtils.user = {};
        // 跳转到登录页面
        this.props.navigate("/login");
      },
    });
  };
  render() {
    const userName = memoryUtils.user.username;
    const title = this.getTitle(menuList);
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{userName}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span className="header-bottom-right-time">{this.state.time}</span>
            <span className="header-bottom-right-city">
              {this.state.weather.city}
            </span>
            <span className="header-bottom-right-weather">
              {this.state.weather.realtime?.weather}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
