import React, { Component } from "react";
import { Button } from "antd";
import "./App.less";
export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Button type="primary">Click me</Button>
      </div>
    );
  }
}
