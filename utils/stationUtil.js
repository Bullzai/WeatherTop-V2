// "use strict";

const stationUtil = {
    ppr() {
        return "aaaaaaaaaaa";
    },

    temperature(station) {
        if (!station.readings.isEmpty()) {
          return station.readings.get(station.readings.size() - 1).temperature;
        }
        return 0;
      }
};

module.exports = stationUtil;
