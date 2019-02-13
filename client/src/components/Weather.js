import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import store from "store";
import { addHours, isBefore } from "date-fns";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { distanceInWords } from "date-fns";
import Skycons from "react-skycons";

function Weather(props) {
  const { classes } = props;
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    function locationError(err) {
      console.warn(err);
    }
    if (!!navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude
          });
        },
        locationError,
        { timeout: 10000 }
      );
    } else {
      console.warn("Geolocation is required for this application. Sorry.");
    }
  });

  useEffect(() => {
    if (location) {
      getUserWeather(location);
    }
  }, [location]);

  function getUserWeather() {
    const { latitude, longitude } = location;
    let weatherStore = store.get("weather");
    const fetchWeather = async (latitude, longitude) => {
      try {
        let res = await axios.get(`/api/getWeather/${latitude}/${longitude}`);

        if (res) {
          const weather = res.data;
          setWeather(weather);
          store.set("weather", weather);
        }
        // console.log(weather);
      } catch (err) {
        console.error(err);
      }
    };

    if (!weatherStore) {
      console.log("No weather store");
      fetchWeather(latitude, longitude);
    } else {
      console.log("There is a weather store");
      setWeather(weatherStore);
      const now = new Date();
      const fetchedTimePlusOneHour = addHours(weatherStore.currently.time * 1000, 1);

      if (!isBefore(now, fetchedTimePlusOneHour)) {
        console.log(`but, it's been an hour.`);
        fetchWeather(latitude, longitude);
      }
    }
  }

  if (location === null || weather === null) {
    return "Loading...";
  }

  return (
    <Card className={classes.card}>
      <CardActionArea>
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
      <CardActions />
    </Card>
  );
}

Weather.propTypes = {
  classes: PropTypes.object.isRequired
};

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

export default withStyles(styles)(Weather);
