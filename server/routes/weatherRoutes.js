const _ = require("lodash");
const Path = require("path-parser");
const axios = require("axios");
const { URL } = require("url");
const mongoose = require("mongoose");
const keys = require("../config/keys");

const Weather = mongoose.model("weathers");

const fetchWeatherFromApi = async location => {
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

module.exports = app => {
  app.get("/api/getWeather/:location", async (req, res) => {
    console.log(`Location: ${req.params.location}`);
    const { location } = req.params;

    let weather = await Weather.findOne({
      location
    });

    if (weather) {
      console.log("sending persistence data");
      res.json({ success: true, data: weather });
    } else {
      console.log("fetching new data");
      // let weatherFromApi = await fetchWeatherFromApi(location);

      // let weather = new Weather({
      //   location,
      //   weather: weatherFromApi.data,
      //   dateCreated: Date.now(),
      //   dateUpdated: Date.now()
      // });

      // try {
      //   await weather.save();
      //   res.send(weather);
      // } catch (err) {
      //   res.status(422).send(err);
      // }
    }
  });
};
