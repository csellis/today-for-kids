import React, { Component } from "react";
import { Context } from "../Provider";

export default class Weather extends Component {
  render() {
    return (
      <Context.Consumer>
        {context => {
          // console.log(context);
          return <WeatherQuery location={context.state.zipcode} />;
        }}
      </Context.Consumer>
    );
  }
}

function WeatherQuery({ location }) {
  return <div>Weather!</div>;
}
