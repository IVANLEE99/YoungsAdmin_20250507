import React, { Component } from "react";
import PropTypes, { func, number } from "prop-types";
import { increment, decrement, incrementAsync } from "../redux/action";
import { connect } from "react-redux";
import Counter from "../components/Counter";

// function mapStateToProps(state) {
//   return {
//     count: state.count,
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     increment: (number) => dispatch(increment(number)),
//     decrement: (number) => dispatch(decrement(number)),
//   };
// }
export default connect((state) => ({ count: state.count }), {
  increment,
  decrement,
  incrementAsync,
})(Counter);
