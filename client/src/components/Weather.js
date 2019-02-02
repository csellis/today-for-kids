import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Context } from "../Provider";

export default class Weather extends Component {
  render() {
    return (
      <Context.Consumer>
        {context => {
          console.log(context);
          return <WeatherQuery location={context.state.zipcode} />;
        }}
      </Context.Consumer>
    );
  }
}

function WeatherQuery({ location }) {
  return (
    <Query
      query={WEATHER_QUERY}
      variables={{
        location
      }}
    >
      {({ data, loading }) => {
        if (loading) return "Loading...";
        const { weathers } = data;
        console.log(weathers);
        return <div>Hi from Weather</div>;
      }}
    </Query>
  );
}

const WEATHER_QUERY = gql`
  query weather($location: String!) {
    weathers(where: { location: $location }) {
      id
      location
      weather
    }
  }
`;
