import React, { Component } from "react";
import axios from "axios";

import store from "store";

export const Context = React.createContext();

class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zipcode: "",
      weather: {}
    };
  }

  componentDidMount() {
    const storeZipcode = store.get("zipcode");
    const fetchWeather = async () => {
      try {
        let weather = await axios.get(`/api/getWeather/${storeZipcode}`);

        if (weather) {
          this.setState({
            weather: weather.data.data
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    // console.log(`Zipcode: ${storeZipcode}`);
    fetchWeather(storeZipcode);

    if (storeZipcode) {
      this.setState({
        zipcode: storeZipcode
      });
    }
  }

  updateZipcode = zipcode => {
    const storeZipcode = store.get("zipcode");
    this.setState({
      zipcode
    });
    if (zipcode !== storeZipcode) {
      store.set("zipcode", zipcode);
    }
  };

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          setZipcode: event => {
            this.updateZipcode(event.target.value);
          }
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Provider;
