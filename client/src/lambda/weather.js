const axios = require("axios");

exports.handler = function(event, context, callback) {
  const { latitude, longitude } = event.queryStringParameters;
  const DARKSKY_API_KEY = process.env.REACT_APP_DARKSKY;
  const API_URL = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${latitude},${longitude}?exclude=minutely,flags`;

  //send response
  const send = body => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    });
  };

  const getWeather = () => {
    axios
      .get(API_URL)
      .then(res => send(res.data))
      .catch(err => send(err));
  };

  if (event.httpMethod === "get") {
    getWeather();
  }
};
