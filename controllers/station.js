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
    viewData.station["temperature"] = stationAnalytics.getTemperature(viewData.station);
    viewData.station["fahrenheit"] = stationAnalytics.getFahrenheit(viewData.station);
    viewData.station["weather"] = stationAnalytics.getWeather(viewData.station);
    viewData.station["beaufort"] = stationAnalytics.getBeaufort(viewData.station);
    viewData.station["direction"] = stationAnalytics.getDirection(viewData.station);
    viewData.station["pressure"] = stationAnalytics.getPressure(viewData.station);
    viewData.station["feelsLike"] = stationAnalytics.getFeelsLike(viewData.station);
    viewData.station["minTemperature"] = stationAnalytics.getMin("temperature", viewData.station);
    viewData.station["minWindSpeed"] = stationAnalytics.getMin("windSpeed", viewData.station);
    viewData.station["minPressure"] = stationAnalytics.getMin("pressure", viewData.station);
    viewData.station["maxTemperature"] = stationAnalytics.getMax("temperature", viewData.station);
    viewData.station["maxWindSpeed"] = stationAnalytics.getMax("windSpeed", viewData.station);
    viewData.station["maxPressure"] = stationAnalytics.getMax("pressure", viewData.station);
    viewData.station["temperatureTrend"] = stationAnalytics.getTrend("temperature", viewData.station);
    viewData.station["windTrend"] = stationAnalytics.getTrend("windSpeed", viewData.station);
    viewData.station["pressureTrend"] = stationAnalytics.getTrend("pressure", viewData.station);

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
    // const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      date: new Date().toLocaleString(),
      code: parseInt(request.body.code),
      temperature: parseInt(request.body.temperature),
      windSpeed: parseInt(request.body.windSpeed),
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
    let report = {};
    const result = await axios.get(oneCallRequest);
    if (result.status == 200) {
      const reading = result.data.current;
      report.code = reading.weather[0].id;
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;
    }
    console.log(report);
    const viewData = {
      title: "Weather Report",
      reading: report
    };

    stationStore.addReading(stationId, newReading);
    response.render("station", viewData);
  },
};

module.exports = station;