import React, { Component } from 'react';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from './Theme';
import Routes from './Routes';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Theme>
          <CssBaseline />
          <div className="App">
            <Header />
            <Routes />
          </div>
        </Theme>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
