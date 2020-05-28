const request = require("request");

const location = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=34e6c38f53c55fb1b41513a314b93358&query=" +
    address +
    "&units = m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.location === "") {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        address,
      });
    }
  });
};

module.exports = location;
