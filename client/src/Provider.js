import React, { Component } from "react";
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
    const storeWeather = store.get("weather");
    if (storeZipcode) {
      this.setState({
        zipcode: storeZipcode
      });
    }
    if (storeWeather) {
      this.setState({
        weather: storeWeather
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
