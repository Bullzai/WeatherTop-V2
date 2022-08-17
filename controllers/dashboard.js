"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const stationAnalytics = require("../utils/station-analytics");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);

    // check if user is actually logged in, if not - clear his cookies and redirect back to login page
    if (!loggedInUser) {
      response.cookie("station", "");
      response.redirect("/");
    }

    const viewData = {
      title: "Stations Dashboard",
      stations: stationStore.getUserStations(loggedInUser.id),
    };

    // populate station objects with latest reading info from station-analytic utilty
    for (let i = 0; i < viewData.stations.length; i++) {
      viewData.stations[i]["latestTemp"] = stationAnalytics.getTemperature(viewData.stations[i]);
      viewData.stations[i]["fahrenheit"] = stationAnalytics.getFahrenheit(viewData.stations[i]);
      viewData.stations[i]["weather"] = stationAnalytics.getWeather(viewData.stations[i]);
      viewData.stations[i]["beaufort"] = stationAnalytics.getBeaufort(viewData.stations[i]);
      viewData.stations[i]["directionLabel"] = stationAnalytics.getDirection(viewData.stations[i]);
      viewData.stations[i]["latestPressure"] = stationAnalytics.getPressure(viewData.stations[i]);
      viewData.stations[i]["feelsLike"] = stationAnalytics.getFeelsLike(viewData.stations[i]);
      viewData.stations[i]["minTemp"] = stationAnalytics.getMin("temperature", viewData.stations[i]);
      viewData.stations[i]["minWind"] = stationAnalytics.getMin("windSpeed", viewData.stations[i]);
      viewData.stations[i]["minPressure"] = stationAnalytics.getMin("pressure", viewData.stations[i]);
      viewData.stations[i]["maxTemp"] = stationAnalytics.getMax("temperature", viewData.stations[i]);
      viewData.stations[i]["maxWind"] = stationAnalytics.getMax("windSpeed", viewData.stations[i]);
      viewData.stations[i]["maxPressure"] = stationAnalytics.getMax("pressure", viewData.stations[i]);
      viewData.stations[i]["tempIcon"] = stationAnalytics.getTrend("temperature", viewData.stations[i]);
      viewData.stations[i]["windIcon"] = stationAnalytics.getTrend("windSpeed", viewData.stations[i]);
      viewData.stations[i]["pressureIcon"] = stationAnalytics.getTrend("pressure", viewData.stations[i]);
    }

    // sort the stations alphabetically, case insensitive
    viewData.stations.sort((a, b) => a.name.localeCompare(b.name));
    response.render("dashboard", viewData);
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      longitude: parseFloat(request.body.longitude),
      latitude: parseFloat(request.body.latitude),
      readings: [],
      weather: []
    };
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
