import React, { Component } from "react";
import "./App.css";
import Theme from "./Theme";
import Routes from "./Routes";
import Header from "./components/Header";
import CssBaseline from "@material-ui/core/CssBaseline";

class App extends Component {
  render() {
    return (
      <Theme>
        <CssBaseline />
        <div className='App'>
          <Header />
          <Routes />
        </div>
      </Theme>
    );
  }
}

export default App;
