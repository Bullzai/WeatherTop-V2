"use strict";

const logger = require("../utils/logger");
const stationCollection = require("../models/station-store.js");
const stationUtil = require("../utils/stationUtil");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Stations Dashboard",
      stations: stationCollection
    };
    logger.info("about to render", stationCollection);
    console.log(`about rendering --- ${stationUtil.ppr()}`);

    response.render("dashboard", viewData);
  }
};

module.exports = dashboard;
