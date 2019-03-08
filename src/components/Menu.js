import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { SwipeableDrawer } from '@material-ui/core';
import List from '@material-ui/core/List';
import SettingsIcon from '@material-ui/icons/Settings';
import CloudIcon from '@material-ui/icons/CloudOutlined';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import ListItemLink from './ListItemLink';

const styles = {
  list: {
    width: 250,
  },
};

function Menu(props) {
  const { classes, setOpen, open } = props;

  return (
    <div className={classes.root}>
      <SwipeableDrawer
        className={classes.drawer}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <List className={classes.list} onClick={() => setOpen(false)}>
          <ListItemLink to="/" icon={<CloudIcon />} primary="Weather" />
          <ListItemLink
            to="/schedule"
            icon={<CalendarIcon />}
            primary="Schedule"
          />
          <ListItemLink
            to="/settings"
            icon={<SettingsIcon />}
            primary="Settings"
          />
        </List>
      </SwipeableDrawer>
    </div>
  );
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Menu);
