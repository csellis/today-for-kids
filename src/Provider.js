import React, { Component } from "react";

export const Context = React.createContext();

class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zipcode: ""
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          setZipcode: event => {
            console.log(event.target.value);
            this.setState({
              zipcode: event.target.value
            });
          }
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Provider;
