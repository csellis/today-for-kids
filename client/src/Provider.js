import React, { Component } from "react";
import axios from "axios";
import store from "store";
import { addHours, isBefore } from "date-fns";
import { isNull } from "lodash";

export const Context = React.createContext();

class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: {},
      location: null,
      getUserWeather: () => this.getUserWeather()
    };
  }

  componentDidMount() {
    this.getWeatherFromStore();
  }

  getWeatherFromStore() {
    let weatherStore = store.get("weather");
    if (weatherStore) {
      this.setState({
        weather: weatherStore
      });
    }
  }

  getUserLocation() {
    let latitude, longitude;
    if (!!navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        this.setState({
          location: {
            latitude,
            longitude
          }
        });
      });
    } else {
      console.warn("Geolocation is required for this application. Sorry.");
    }
  }

  getUserWeather() {
    let latitude, longitude;
    if (isNull(this.state.location)) {
      this.setState({
        latitude: 35.779558,
        longitude: -78.638054
      });
      latitude = 35.779558;
      longitude = -78.638054;
    } else {
      latitude = this.state.location.latitude;
      longitude = this.state.location.longitude;
    }
    let weatherStore = store.get("weather");
    const fetchWeather = async (latitude, longitude) => {
      try {
        let res = await axios.get(`/api/getWeather/${latitude}/${longitude}`);

        if (res) {
          const weather = res.data;
          this.setState({
            weather
          });
          store.set("weather", weather);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (!weatherStore) {
      console.log("No weather store");
      fetchWeather(latitude, longitude);
    } else {
      console.log("There is a weather store");
      const now = new Date();
      const fetchedTimePlusOneHour = addHours(weatherStore.currently.time * 1000, 1);

      if (!isBefore(now, fetchedTimePlusOneHour)) {
        console.log(`but, it's been an hour.`);
        fetchWeather(latitude, longitude);
      }
    }
  }

  render() {
    this.getUserLocation();

    return (
      <Context.Provider
        value={{
          state: this.state
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Provider;
