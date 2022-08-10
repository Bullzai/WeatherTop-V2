"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const stationAnalytics = require("../utils/station-analytics");
const uuid = require("uuid");
const { getBeaufort } = require("../utils/station-analytics");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("station id = ", stationId);
    const viewData = {
      title: "station",
      station: stationStore.getStation(stationId),
      stationSummary : {
        temperature : stationAnalytics.getTemperature(stationStore.getStation(stationId)),
        fahrenheit : stationAnalytics.getFahrenheit(stationStore.getStation(stationId)),
        weather : stationAnalytics.getWeather(stationStore.getStation(stationId)),
        beaufort : stationAnalytics.getBeaufort(stationStore.getStation(stationId)),
        direction : stationAnalytics.getDirection(stationStore.getStation(stationId)),
        pressure : stationAnalytics.getPressure(stationStore.getStation(stationId)),
        feelsLike : stationAnalytics.getFeelsLike(stationStore.getStation(stationId)),
        minTemp : stationAnalytics.getMin("temperature", stationStore.getStation(stationId)),
        minWindSpeed : stationAnalytics.getMin("windSpeed", stationStore.getStation(stationId)),
        minPressure : stationAnalytics.getMin("pressure", stationStore.getStation(stationId)),
        maxTemp : stationAnalytics.getMax("temperature", stationStore.getStation(stationId)),
        maxWindSpeed : stationAnalytics.getMax("windSpeed", stationStore.getStation(stationId)),
        maxPressure : stationAnalytics.getMax("pressure", stationStore.getStation(stationId))
      }
    };

    response.render("station", viewData);
  },

  deleteSong(request, response) {
    const stationId = request.params.id;
    const songId = request.params.songid;
    logger.debug(`Deleting Song ${songId} from station ${stationId}`);
    stationStore.removeSong(stationId, songId);
    response.redirect("/station/" + stationId);
  },

  addSong(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getstation(stationId);
    const newSong = {
      id: uuid.v1(),
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration)
    };
    logger.debug("New Song = ", newSong);
    stationStore.addSong(stationId, newSong);
    response.redirect("/station/" + stationId);
  }
};

module.exports = station;