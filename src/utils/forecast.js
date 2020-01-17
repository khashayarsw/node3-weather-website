const request = require('request');

const forecast = (latitude, langitude, callback) => {
  const url = "https://api.darksky.net/forecast/776d674fb62c14ee47c7b8322ea5fad7/" + latitude + "," + langitude + "?units=si";
  request({
    url: url,
    json: true
  }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service! ", undefined);
    } else if (response.body.error === "Poorly formatted request") {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + ' chance of rain.');
    }
  });
}
module.exports = forecast;