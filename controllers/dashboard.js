"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const stationAnalytics = require("../utils/station-analytics");
const uuid = require("uuid");
const { getCurrentUser } = require("./accounts");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Stations Dashboard",
      stations: stationStore.getUserStations(loggedInUser.id),
    };

    // populate station objects with latest reading info from station-analytic utilty
    for (let i = 0; i < viewData.stations.length; i++) {
      viewData.stations[i]["temperature"] = stationAnalytics.getTemperature(viewData.stations[i]);
      viewData.stations[i]["fahrenheit"] = stationAnalytics.getFahrenheit(viewData.stations[i]);
      viewData.stations[i]["weather"] = stationAnalytics.getWeather(viewData.stations[i]);
      viewData.stations[i]["beaufort"] = stationAnalytics.getBeaufort(viewData.stations[i]);
      viewData.stations[i]["direction"] = stationAnalytics.getDirection(viewData.stations[i]);
      viewData.stations[i]["pressure"] = stationAnalytics.getPressure(viewData.stations[i]);
      viewData.stations[i]["feelsLike"] = stationAnalytics.getFeelsLike(viewData.stations[i]);
      viewData.stations[i]["minTemperature"] = stationAnalytics.getMin("temperature", viewData.stations[i]);
      viewData.stations[i]["minWindSpeed"] = stationAnalytics.getMin("windSpeed", viewData.stations[i]);
      viewData.stations[i]["minPressure"] = stationAnalytics.getMin("pressure", viewData.stations[i]);
      viewData.stations[i]["maxTemperature"] = stationAnalytics.getMax("temperature", viewData.stations[i]);
      viewData.stations[i]["maxWindSpeed"] = stationAnalytics.getMax("windSpeed", viewData.stations[i]);
      viewData.stations[i]["maxPressure"] = stationAnalytics.getMax("pressure", viewData.stations[i]);
    }

    logger.info("about to render", stationStore);

    response.render("dashboard", viewData);
  }
};

module.exports = dashboard;
