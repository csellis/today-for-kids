import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Settings from "./components/Settings";

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/settings' component={Settings} />
  </Switch>
);
export default Routes;
