"use strict";

const stationAnalytics = {
    getTemperature(station) {
      if (station.readings.length > 0) {
        return station.readings[station.readings.length - 1].temperature;
      }
    },

    getPressure(station) {
      if (station.readings.length) {
        return station.readings[station.readings.length - 1].pressure;
      }
    },

    getFahrenheit(station) {
      if (station.readings.length > 0) {
        let cels = station.readings[station.readings.length - 1].temperature;
        return (cels * 9 / 5 + 32);
      }
    },

    getWeather(station) {
      let code = 0;
      let weather = ["", ""];
  
      if (station.readings.length > 0) {
        code = station.readings[station.readings.length - 1].code;
      }
  
      switch (code) {
        case 100:
          weather[0] = "Clear";
          weather[1] = "sun";
          break;
        case 200:
          weather[0] = "Partial Clouds";
          weather[1] = "cloud sun";
          break;
        case 300:
          weather[0] = "Cloudy";
          weather[1] = "cloud";
          break;
        case 400:
          weather[0] = "Light Showers";
          weather[1] = "cloud sun rain";
          break;
        case 500:
          weather[0] = "Heavy Showers";
          weather[1] = "cloud showers heavy";
          break;
        case 600:
          weather[0] = "Rain";
          weather[1] = "cloud rain";
          break;
        case 700:
          weather[0] = "Snow";
          weather[1] = "snowflake";
          break;
        case 800:
          weather[0] = "Thunder";
          weather[1] = "bolt";
          break;
        default:
          weather[0] = "";
          weather[1] = "";
      }
      return weather;
    },

    getBeaufort(station) {
      let beaufort = 0;
      let windSpeed = 0;
  
      if (station.readings.length > 0) {
        windSpeed = station.readings[station.readings.length - 1].windSpeed;
      }
      if (1 < windSpeed && windSpeed < 5) {
        beaufort = 1;
      } else if (6 < windSpeed && windSpeed < 11) {
        beaufort = 2;
      } else if (12 < windSpeed && windSpeed < 19) {
        beaufort = 3;
      } else if (20 < windSpeed && windSpeed < 28) {
        beaufort = 4;
      } else if (29 < windSpeed && windSpeed < 38) {
        beaufort = 5;
      } else if (39 < windSpeed && windSpeed < 49) {
        beaufort = 6;
      } else if (50 < windSpeed && windSpeed < 61) {
        beaufort = 7;
      } else if (62 < windSpeed && windSpeed < 74) {
        beaufort = 8;
      } else if (75 < windSpeed && windSpeed < 88) {
        beaufort = 9;
      } else if (89 < windSpeed && windSpeed < 102) {
        beaufort = 10;
      } else if (103 < windSpeed && windSpeed < 117) {
        beaufort = 11;
      }
      return beaufort;
    },

    getDirection(station) {
      let direction = null;
      let windDirection = 0;
  
      if (station.readings.length > 0) {
        windDirection = station.readings[station.readings.length - 1].windDirection;
      }
      if (348.75 < windDirection && windDirection < 11.25) {
        direction = "North";
      } else if (11.25 < windDirection && windDirection < 33.75) {
        direction = "North North East";
      } else if (33.75 < windDirection && windDirection < 56.25) {
        direction = "North East";
      } else if (56.25 < windDirection && windDirection < 78.75) {
        direction = "East North East";
      } else if (78.75 < windDirection && windDirection < 101.25) {
        direction = "East";
      } else if (101.25 < windDirection && windDirection < 123.75) {
        direction = "East South East";
      } else if (123.75 < windDirection && windDirection < 146.25) {
        direction = "South East";
      } else if (146.25 < windDirection && windDirection < 168.75) {
        direction = "South South East";
      } else if (168.75 < windDirection && windDirection < 191.25) {
        direction = "South";
      } else if (191.25 < windDirection && windDirection < 213.75) {
        direction = "South South West";
      } else if (213.75 < windDirection && windDirection < 236.25) {
        direction = "South West";
      } else if (236.25 < windDirection && windDirection < 258.75) {
        direction = "West South West";
      } else if (258.75 < windDirection && windDirection < 281.25) {
        direction = "West";
      } else if (281.25 < windDirection && windDirection < 303.75) {
        direction = "West North West";
      } else if (303.75 < windDirection && windDirection < 326.25) {
        direction = "North West";
      } else if (326.25 < windDirection && windDirection < 348.75) {
        direction = "North North West";
      }
      return direction;
    },
  
    getFeelsLike(station) {
      let temperature = 0;
      let windSpeed = 0;
  
      if (station.readings.length > 0) {
        temperature = station.readings[station.readings.length - 1].temperature;
        windSpeed = station.readings[station.readings.length - 1].windSpeed;
      } else {
        return 0;
      }
  
      let power = Math.pow(windSpeed, 0.16);
      return Math.round((13.12 + 0.6215 * temperature - 11.37 * power + 0.3965 * temperature * power) * 100.0) / 100.0;
    },

    getMin(property, station) {
      let minValue = null;
      if (station.readings.length > 0) {
        switch (property) {
          case "temperature":
            minValue = station.readings[0].temperature;
            for (let i = 0; i < station.readings.length; i++) {
              if (minValue > station.readings[i].temperature) {
                minValue = station.readings[i].temperature;
              }
            }
            break;
          case "windSpeed":
            minValue = station.readings[0].windSpeed;
            for (let i = 0; i < station.readings.length; i++) {
              if (minValue > station.readings[i].windSpeed) {
                minValue = station.readings[i].windSpeed;
              }
            }
            break;
          case "pressure":
            minValue = station.readings[0].pressure;
            for (let i = 0; i < station.readings.length; i++) {
              if (minValue > station.readings[i].pressure) {
                minValue = station.readings[i].pressure;
              }
            }
            break;
        }
        return "Min: " + minValue;
      }
    },

    getMax(property, station) {
      let maxValue = null;
      if (station.readings.length > 0) {
        switch (property) {
          case "temperature":
            maxValue = station.readings[0].temperature;
            for (let i = 0; i < station.readings.length; i++) {
              if (maxValue < station.readings[i].temperature) {
                maxValue = station.readings[i].temperature;
              }
            }
            break;
          case "windSpeed":
            maxValue = station.readings[0].windSpeed;
            for (let i = 0; i < station.readings.length; i++) {
              if (maxValue < station.readings[i].windSpeed) {
                maxValue = station.readings[i].windSpeed;
              }
            }
            break;
          case "pressure":
            maxValue = station.readings[0].pressure;
            for (let i = 0; i < station.readings.length; i++) {
              if (maxValue < station.readings[i].pressure) {
                maxValue = station.readings[i].pressure;
              }
            }
            break;
        }
        return "Max: " + maxValue;
      }
    }
};

module.exports = stationAnalytics;
