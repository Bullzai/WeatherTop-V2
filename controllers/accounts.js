"use strict";

const userstore = require("../models/user-store");
const logger = require("../utils/logger");
const uuid = require("uuid");
const userStore = require("../models/user-store");

const accounts = {
  login(request, response) {
    if (request.cookies.station) {
      response.redirect("dashboard");
    }

    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie("station", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Sign up for the Service"
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.cookie("station", user.email);
    response.redirect("/");
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie("station", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.station;
    return userstore.getUserByEmail(userEmail);
  },

  showProfile(request, response) {
    const userEmail = request.cookies.station;
    const viewData = userstore.getUserByEmail(userEmail);
    response.render("profile", viewData);
  },

  editProfile(request, response) {
    const userEmail = request.cookies.station;
    const user = userstore.getUserByEmail(userEmail);

    // check if the user has entered something in the fields
    if (request.body.email) {
      user.email = request.body.email;
    }
    if (request.body.password) {
      user.password = request.body.password;
    }
    if (request.body.firstName) {
      user.firstName = request.body.firstName;
    }
    if (request.body.lastName) {
      user.lastName = request.body.lastName;
    }

    userStore.editUser();
    response.cookie("station", user.email);
    response.redirect("/profile");
  }
};

module.exports = accounts;