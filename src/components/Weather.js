import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import store from 'store';
import { addHours, isBefore, formatDistance } from 'date-fns';
import isEmpty from 'lodash/isEmpty';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import dino from '../assets/dino.png';

import { useLocationStoreOrRedirect } from '../hooks/useLocationStoreOrRedirect';
import { useBackground } from '../hooks/useBackground';

function Weather(props) {
  const { classes } = props;
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [background] = useBackground(weather);

  const weatherStore = store.get('weather');

  useEffect(() => {
    useLocationStoreOrRedirect(setLocation, setRedirect);
  }, []);

  useEffect(() => {
    if (location) {
      if (!weatherStore || isEmpty(weatherStore)) {
        console.log('No weather store');
        fetchWeather(location);
      } else {
        console.log('There is a weather store');
        setWeather(weatherStore);
        const now = new Date();
        const fetchedTimePlusOneHour = addHours(
          weatherStore.currently.time * 1000,
          1
        );

        if (!isBefore(now, fetchedTimePlusOneHour)) {
          console.log(`but, it's been an hour.`);
          fetchWeather(location);
        }
      }
    }
  }, [location]);

  const fetchWeather = async location => {
    const { latitude, longitude } = location;

    try {
      const res = await fetch(
        `/.netlify/functions/weather?latitude=${latitude}&longitude=${longitude}`
      );
      const data = await res.json();
      setWeather(data);
      store.set('weather', data);
    } catch (err) {
      console.error(err);
    }
  };

  if (redirect) {
    return <Redirect to="/settings" />;
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
        <div style={{ backgroundColor: background, padding: '20px' }}>
          <div className={classes.weather}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="secondary"
            >
              {apparentTemperature}
            </Typography>
          </div>
          <CardMedia
            component="div"
            className={classes.media}
            image={dino}
            title="Cute Dinosaur, RAWR"
            onClick={() => setShowCard(!showCard)}
          />
        </div>
        <Collapse in={showCard} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              High: {maxTemperature} <br />
              Now: {apparentTemperature}
            </Typography>
            <Typography component="p">{summaryToday}</Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {formatDistance(new Date(), weather.currently.time * 1000)}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}

Weather.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  card: {
    minWidth: 275,
  },
  media: {
    minHeight: '40vh',
    backgroundSize: 'contain',
  },
  weather: {
    right: 0,
    textAlign: 'right',
  },
};

export default withStyles(styles)(Weather);
