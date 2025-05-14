import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    if (!user || !user._id) {
      return <Navigate to="/login" />;
    }
    return (
      <div>
        <h1>Admin, {user.username}</h1>
      </div>
    );
  }
}
