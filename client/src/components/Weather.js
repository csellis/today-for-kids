import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
// import axios from "axios";

import { Context } from "../Provider";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { distanceInWords } from "date-fns";
// var Skycons = require("react-skycons");
import Skycons from "react-skycons";

const styles = {
  card: {
    minWidth: 275
  }
};

function convertIconString(icon) {
  return icon
    .toUpperCase()
    .split("")
    .map(char => {
      return char === "-" ? "_" : char;
    })
    .join("");
}

function Weather(props) {
  const { classes } = props;
  const context = useContext(Context);
  const { weather } = context.state;

  console.log(weather);
  return isEmpty(weather) ? (
    <div>
      No Weather
      <Button size='small' onClick={() => context.state.getUserWeather()}>
        Fetch Weather
      </Button>
    </div>
  ) : (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image='/static/images/cards/contemplative-reptile.jpg'
          title='Contemplative Reptile'
        />
        <Skycons color='black' icon={convertIconString(weather.hourly.icon)} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            High: {weather.daily.data[0].apparentTemperatureHigh} <br />
            Now: {weather.currently.apparentTemperature}
          </Typography>
          <Typography component='p'>{weather.hourly.summary}</Typography>
          <Typography className={classes.title} color='textSecondary' gutterBottom>
            {distanceInWords(new Date(), weather.currently.time * 1000)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color='primary' size='small' onClick={() => context.state.getUserWeather()}>
          Fetch Weather
        </Button>
      </CardActions>
    </Card>
  );
}

Weather.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Weather);
