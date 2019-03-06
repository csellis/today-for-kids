import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { SwipeableDrawer } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemLink from "./ListItemLink";
import SettingsIcon from "@material-ui/icons/Settings";
import CloudIcon from "@material-ui/icons/CloudOutlined";

const styles = {
  list: {
    width: 250
  }
};

function Menu(props) {
  const { classes, setOpen } = props;

  return (
    <div className={classes.root}>
      <SwipeableDrawer
        className={classes.drawer}
        open={props.open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <List className={classes.list} onClick={() => setOpen(false)}>
          <ListItemLink to='/' icon={<CloudIcon />} primary={"Weather"} />
          <ListItemLink to='/settings' icon={<SettingsIcon />} primary={"Settings"} />
        </List>
      </SwipeableDrawer>
    </div>
  );
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);
