"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const stationAnalytics = require("../utils/station-analytics");
const uuid = require("uuid");
const axios = require("axios");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    const viewData = {
      title: "station",
      station: stationStore.getStation(stationId),
    };

    // fill in the latest data
    viewData.station["latestTemp"] = stationAnalytics.getTemperature(viewData.station);
    viewData.station["fahrenheit"] = stationAnalytics.getFahrenheit(viewData.station);
    viewData.station["weather"] = stationAnalytics.getWeather(viewData.station);
    viewData.station["beaufort"] = stationAnalytics.getBeaufort(viewData.station);
    viewData.station["directionLabel"] = stationAnalytics.getDirection(viewData.station);
    viewData.station["latestPressure"] = stationAnalytics.getPressure(viewData.station);
    viewData.station["feelsLike"] = stationAnalytics.getFeelsLike(viewData.station);
    viewData.station["minTemp"] = stationAnalytics.getMin("temperature", viewData.station);
    viewData.station["minWind"] = stationAnalytics.getMin("windSpeed", viewData.station);
    viewData.station["minPressure"] = stationAnalytics.getMin("pressure", viewData.station);
    viewData.station["maxTemp"] = stationAnalytics.getMax("temperature", viewData.station);
    viewData.station["maxWind"] = stationAnalytics.getMax("windSpeed", viewData.station);
    viewData.station["maxPressure"] = stationAnalytics.getMax("pressure", viewData.station);
    viewData.station["tempIcon"] = stationAnalytics.getTrend("temperature", viewData.station);
    viewData.station["windIcon"] = stationAnalytics.getTrend("windSpeed", viewData.station);
    viewData.station["pressureIcon"] = stationAnalytics.getTrend("pressure", viewData.station);

    response.render("station", viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingId;
    logger.debug(`Deleting Reading ${readingId} from station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const newReading = {
      id: uuid.v1(),
      date: new Date().toLocaleString(),
      code: parseInt(request.body.code),
      temperature: parseFloat(request.body.temperature),
      windSpeed: parseFloat(request.body.windSpeed),
      windDirection: parseInt(request.body.windDirection),
      pressure: parseInt(request.body.pressure)
    };
    logger.debug("New Reading = ", newReading);
    stationStore.addReading(stationId, newReading);
    
    response.redirect("/station/" + stationId);
  },

  async generateReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const lng = station.longitude;
    const lat = station.latitude;
    const apiKey = "fe9134d3c80f73370254f16336563cea";
    const oneCallRequest = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;
    const result = await axios.get(oneCallRequest);
    let report = {};

    if (result.status == 200) { //make sure we got a successful response
      const reading = result.data.current;
      report.id = uuid.v1();
      report.date = new Date().toLocaleString();
      report.code = Math. round(reading.weather[0].id / 100) * 100;
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;
      station.weather[0] = reading.weather[0].description;

      station.tempTrend = [];
      station.trendLabels = [];
      const trends = result.data.daily;
      for (let i = 0; i < trends.length; i++) {
        station.tempTrend.push(trends[i].temp.day);
        const date = new Date(trends[i].dt * 1000);
        station.trendLabels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` );
      }
    }

    stationStore.addReading(stationId, report);
    response.redirect("/station/" + stationId);
  },
};

module.exports = station;