const request = require("request");
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZG9taW5nb29vIiwiYSI6ImNsNGNtc3dhOTAwMDQzaWxqNG1pb3hiNXUifQ.mdHrgGN8iVJN0HlAkjpx7Q`;
  request(
    {
      url: url,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect.");
      } else if (body.features.length === 0) {
        callback("Unable to find location.");
      } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name,
        });
      }
    }
  );
};

module.exports = {
  geocode: geocode,
};
