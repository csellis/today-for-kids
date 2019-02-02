import React, { Component } from "react";
import Settings from "./Settings";
import Weather from "./Weather";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Settings />
        <Weather />
      </div>
    );
  }
}
