import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import axios from "axios";
import store from "store";
import { addHours, isBefore, distanceInWords } from "date-fns";
import isEmpty from "lodash/isEmpty";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import dino from "../assets/dino.png";
import { Button } from "@material-ui/core";

function Weather(props) {
  const { classes } = props;
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [background, setBackground] = useState("white");
  const [showCard, setShowCard] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const locationStore = store.get("location");
  const weatherStore = store.get("weather");

  useEffect(() => {
    if (locationStore) {
      const { latitude, longitude } = locationStore;
      setLocation({
        latitude,
        longitude
      });
    } else {
      setRedirect(true);
    }
  }, []);

  useEffect(() => {
    if (location) {
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
      let res = await axios.get(`/.netlify/functions/weather`, {
        params: {
          latitude,
          longitude
        }
      });
      if (res) {
        // console.log(res);
        const weather = res.data;
        setWeather(weather);
        store.set("weather", weather);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (redirect) {
    return <Redirect to='/settings' />;
  }

  if (location === null || weather === null) {
    return <CircularProgress />;
  }

  // console.log(weather);
  const weatherToday = weather.daily.data[0];
  const apparentTemperature = Math.round(weather.currently.apparentTemperature);
  const maxTemperature = Math.round(weatherToday.apparentTemperatureMax);
  const summaryToday = weatherToday.summary;

  return (
    <>
      <Card className={classes.card}>
        <div style={{ backgroundColor: background, padding: "20px" }}>
          <div className={classes.weather}>
            <Typography gutterBottom variant='h5' component='h2' color='secondary'>
              {apparentTemperature}
            </Typography>
          </div>
          <CardMedia
            component='div'
            className={classes.media}
            image={dino}
            title='Cute Dinosaur, RAWR'
            onClick={() => setShowCard(!showCard)}
          />
        </div>
        <Button onClick={() => fetchWeather(location)}>Fetch weather</Button>
        <Collapse in={showCard} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              High: {maxTemperature} <br />
              Now: {apparentTemperature}
            </Typography>
            <Typography component='p'>{summaryToday}</Typography>
            <Typography className={classes.title} color='textSecondary' gutterBottom>
              {distanceInWords(new Date(), weather.currently.time * 1000)}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
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
