const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f1c4959ebfdb493279c1d8d2494c791c&query=${latitude},${longitude}&units=m`;
  request(
    {
      url: url,
      json: true,
    },
    (error, {body}) => {
      if (error) {
        callback("Unable to connect.");
      } else if (body.error) {
        callback("Unable to find location.");
      } else {
        callback(
          undefined,
          `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}  degree out. Ther is a ${body.current.precip}%  chance of rain. Coordinates ${latitude}, ${longitude}`
        );
      }
    }
  );
};
module.exports = {
  forecast: forecast,
};
