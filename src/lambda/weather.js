const axios = require('axios');

exports.handler = function(event, context, callback) {
  const { latitude, longitude } = event.queryStringParameters;
  const DARKSKY_API_KEY =
    process.env.REACT_APP_DARKSKY || 'cc949301c50ea51f3c0c354d8e2ce16e';
  const API_URL = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${latitude},${longitude}?exclude=minutely,flags`;

  // console.log("handler hit");
  // send response

  const send = body => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body),
    });
  };

  const getWeather = () => {
    axios
      .get(API_URL)
      .then(res => {
        send(res.data);
      })
      .catch(err => send(err));
  };

  if (event.httpMethod !== 'GET') {
    return callback(null, {
      statusCode: 410,
      body: 'Unsupported Request Method',
    });
  }

  try {
    getWeather();
  } catch (err) {
    callback(err);
  }
};
