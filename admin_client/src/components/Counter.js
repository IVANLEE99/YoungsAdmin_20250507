import React, { Component } from "react";
import PropTypes from "prop-types";
import { increment, decrement } from "../redux/action";
export default class Counter extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.selectRef = React.createRef();
  }
  handleClickAdd = () => {
    let value = this.selectRef.current.value * 1;
    this.props.increment(value);
  };
  handleClickMinus = () => {
    let value = this.selectRef.current.value * 1;
    this.props.decrement(value);
  };
  handleClickOddAdd = () => {
    if (this.props.count % 2 === 1) {
      let value = this.selectRef.current.value * 1;
      this.props.increment(value);
    }
  };
  handleClickOddMinus = () => {
    let value = this.selectRef.current.value * 1;
    if (this.props.count % 2 === 1) {
      this.props.decrement(value);
    }
  };
  handleClickAsyncAdd = () => {
    let value = this.selectRef.current.value * 1;
    this.props.incrementAsync(value);
    // setTimeout(() => {
    //   let value = this.selectRef.current.value * 1;
    //   this.props.increment(value);
    // }, 1000);
  };
  handleClickAsyncMinus = () => {
    setTimeout(() => {
      let value = this.selectRef.current.value * 1;
      this.props.decrement(value);
    }, 1000);
  };

  render() {
    console.log(this.props.count);
    return (
      <div>
        点击次数{this.props.count}
        <br />
        <select ref={this.selectRef}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.handleClickAdd}>点击+</button>
        <button onClick={this.handleClickMinus}>点击-</button>
        <button onClick={this.handleClickOddAdd}>点击奇数+</button>
        <button onClick={this.handleClickOddMinus}>点击奇数-</button>
        <button onClick={this.handleClickAsyncAdd}>点击异步+</button>
        <button onClick={this.handleClickAsyncMinus}>点击异步-</button>
      </div>
    );
  }
}
