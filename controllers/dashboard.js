"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const stationUtil = require("../utils/station-analytics");
const uuid = require("uuid");
const { getCurrentUser } = require("./accounts");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Stations Dashboard",
      stations: stationStore.getUserStations(loggedInUser.id)
      // stationSummary : {
      //   shortestSong : playlistAnalytics.getFahrenheit(playlist)
      // }
    };
    logger.info("about to render", stationStore);
    // console.log(`about rendering --- ${stationStore.getLatestReading()}`);
    // console.log(`about rendering --- ${stationUtil.temperature()}`);

    response.render("dashboard", viewData);
  }
};

module.exports = dashboard;
