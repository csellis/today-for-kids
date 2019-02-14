import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/lab/Slider";
import store from "store";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

function Settings(props) {
  const storeTemp = store.get("temp") || 65;
  const [temp, setTemp] = useState(storeTemp);

  const { classes } = props;
  let handleChange = (event, value) => {
    event.preventDefault(true);
    setTemp(value);
    store.set("temp", value);
  };
  return (
    <div className={classes.container}>
      <Typography variant='h5' gutterBottom>
        Select Temperature
      </Typography>
      <Typography variant='subtitle1' gutterBottom>
        Select the temperature at which your child will start wearing clothes for warm weather.
      </Typography>
      <div className={classes.sliderContainer}>
        <Slider
          value={temp}
          min={55}
          max={75}
          step={1}
          onChange={handleChange}
          className={classes.slider}
        />
        <h2>{temp}&deg;F</h2>
      </div>
    </div>
  );
}

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    height: "100vh",
    flexDirection: "column",
    margin: `${theme.spacing.unit * 2}px auto`,
    alignItems: "center"
  },
  sliderContainer: {
    marginTop: theme.spacing.unit * 2
  },
  slider: {
    width: "300px",
    touchAction: "none"
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
