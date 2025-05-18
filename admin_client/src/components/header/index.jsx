import React, { Component } from "react";
import "./index.less";
import { getIpAreaCoordJson, getWeather } from "../../api/weather";
import getCityId from "../../utils/cityIds";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: {},
    };
    this.getLocation();
  }
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
  render() {
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，admin</span>
          <a
            href="javascript:void(0)"
            onClick={() => {
              this.props.history.push("/login");
            }}
          >
            退出
          </a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">首页</div>
          <div className="header-bottom-right">
            <span className="header-bottom-right-time">
              {this.state.weather.realtime?.time}
            </span>
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
