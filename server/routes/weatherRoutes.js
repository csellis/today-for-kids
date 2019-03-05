const axios = require("axios");
const keys = require("../../config/keys");

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
    const { latitude, longitude } = req.params;
    let weatherFromApi = await fetchWeatherFromDarkSky(latitude, longitude);

    try {
      res.send(weatherFromApi.data);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
