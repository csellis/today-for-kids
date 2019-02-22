import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import store from "store";
import { addHours, isBefore } from "date-fns";
import isEmpty from "lodash/isEmpty";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { distanceInWords } from "date-fns";
import dino from "../assets/dino.png";

function Weather(props) {
  const { classes } = props;
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [background, setBackground] = useState("white");

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
  }, []);

  useEffect(() => {
    if (location) {
      let weatherStore = store.get("weather");

      if (!weatherStore || isEmpty(weatherStore)) {
        console.log("No weather store");
        fetchWeather(location);
      } else {
        console.log("There is a weather store");
        setWeather(weatherStore);
        const now = new Date();
        const fetchedTimePlusOneHour = addHours(weatherStore.currently.time * 1000, 1);

        if (!isBefore(now, fetchedTimePlusOneHour)) {
          console.log(`but, it's been an hour.`);
          fetchWeather(location);
        }
      }
    }
  }, [location]);

  useEffect(() => {
    if (weather) {
      const currentTemp = weather.currently.apparentTemperature;
      const dailyHigh = weather.daily.data[0].apparentTemperatureHigh;
      const warmTemp = store.get("temp");

      if (dailyHigh < warmTemp) {
        console.log(`Brrr it's cold`);
        setBackground("aliceblue");
      } else if (dailyHigh > warmTemp && currentTemp < warmTemp) {
        console.log(`It'll warm up later`);
        setBackground("white");
      } else {
        console.log(`It's a little warm.`);
        setBackground("lightcoral");
      }
    }
  });

  const fetchWeather = async location => {
    const { latitude, longitude } = location;
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

  if (location === null || weather === null) {
    return "Loading...";
  }

  return (
    <Card className={classes.card}>
      <div style={{ backgroundColor: background, padding: "20px" }}>
        <div className={classes.weather}>
          <Typography gutterBottom variant='h5' component='h2' color='secondary'>
            {weather.currently.apparentTemperature}
          </Typography>
        </div>
        <CardMedia
          component='div'
          className={classes.media}
          image={dino}
          title='Cute Dinosaur, RAWR'
        />
      </div>
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
    </Card>
  );
}

Weather.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = {
  card: {
    minWidth: 275
  },
  media: {
    minHeight: "40vh",
    backgroundSize: "contain"
  },
  weather: {
    right: 0,
    textAlign: "right"
  }
};

export default withStyles(styles)(Weather);
