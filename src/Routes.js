import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Settings from './pages/Settings';
import Schedule from './pages/Schedule';

const RouteWithTitle = ({ component: Component, title, ...rest }) => (
  <Route {...rest} render={props => <Component title={title} {...props} />} />
);

const Routes = () => (
  <Switch>
    <RouteWithTitle exact path="/" component={Home} title="Weather" />
    <RouteWithTitle path="/schedule" component={Schedule} title="Schedule" />
    <RouteWithTitle path="/settings" component={Settings} title="Settings" />
  </Switch>
);
export default Routes;
