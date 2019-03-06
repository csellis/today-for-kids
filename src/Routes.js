import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Settings from "./components/Settings";

const RouteWithTitle = ({ component: Component, title, ...rest }) => (
  <Route {...rest} render={props => <Component title={title} {...props} />} />
);

const Routes = () => (
  <Switch>
    <RouteWithTitle exact path='/' component={Home} title='Weather' />
    <RouteWithTitle path='/settings' component={Settings} title='Settings' />
  </Switch>
);
export default Routes;
