import React, { useState } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/lab/Slider";
import store from "store";
import { withStyles } from "@material-ui/core/styles";

function Settings(props) {
  const storeTemp = store.get("temp");
  const [temp, setTemp] = useState(storeTemp);

  const { classes } = props;
  return (
    <Paper className={classes.container}>
      <Slider value={temp} min={55} max={75} step={1} onChange={setTemp} />
    </Paper>
  );
}

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    height: "100vh"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);
