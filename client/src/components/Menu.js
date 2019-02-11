import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { SwipeableDrawer } from "@material-ui/core";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
// import ListItem from "@material-ui/core/ListItem";
import ListItemLink from "./ListItemLink";
import SettingsIcon from "@material-ui/icons/Settings";
import CloudIcon from "@material-ui/icons/CloudOutlined";

const styles = {
  list: {
    width: 250
  }
};

function Menu(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <SwipeableDrawer
        className={classes.drawer}
        open={props.open}
        onClose={() => props.setOpen(false)}
        onOpen={() => props.setOpen(true)}
      >
        <List className={classes.list}>
          <ListItemLink icon={<CloudIcon />} to='/' primary={"Weather"} />
          <ListItemLink icon={<SettingsIcon />} to='/settings' primary={"Settings"} />
        </List>
      </SwipeableDrawer>
    </div>
  );
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);
