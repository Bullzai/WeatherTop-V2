"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const station = require("./controllers/station.js");

router.get("/", dashboard.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);

router.get("/station/:id", station.index);
// router.get("/station/:id/deletestation/:stationid", station.deleteStation);
// router.post("/station/:id/addstation", station.addStation);

module.exports = router;
