const _ = require("lodash");
const Path = require("path-parser");
const axios = require("axios");
const { URL } = require("url");
const mongoose = require("mongoose");
const keys = require("../config/keys");

const Weather = mongoose.model("weathers");

const fetchWeatherFromOpenWeatherApi = async location => {
  try {
    return await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?zip=${location},us&APPID=${
        keys.openWeatherMap
      }`
    );
  } catch (error) {
    console.error(error);
  }
};

const fetchWeatherFromDarkSky = async (latitude, longitude) => {
  try {
    return await axios.get(
      `https://api.darksky.net/forecast/${
        keys.darkSky
      }/${latitude},${longitude}?exclude=minutely,flags`
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = app => {
  app.get("/api/getWeather/:latitude/:longitude", async (req, res) => {
    // console.log(
    //   `Location: ${req.params.latitude}, ${req.params.longitude}, userId: ${req.params.userId}`
    // );
    const { latitude, longitude } = req.params;

    console.log("fetching new data");
    let weatherFromApi = await fetchWeatherFromDarkSky(latitude, longitude);

    try {
      res.send(weatherFromApi.data);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
