"use strict";

const express = require("express");
const router = express.Router();

const accounts = require("./controllers/accounts.js");
const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const station = require("./controllers/station.js");

router.get("/", accounts.login);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);
router.get("/profile", accounts.showProfile);
router.post("/profile/editprofile", accounts.editProfile);

router.get("/dashboard", dashboard.index);
router.get("/dashboard/deletestation/:id", dashboard.deleteStation);
router.post("/dashboard/addstation", dashboard.addStation);

router.get("/about", about.index);

router.get("/station/:id", station.index);
router.get("/station/:id/deletereading/:readingId", station.deleteReading);
router.post("/station/:id/addreading", station.addReading);
router.post("/station/:id/generatereading", station.generateReading);

module.exports = router;
