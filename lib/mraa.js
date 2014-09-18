"use strict";

var env = process.env.NODE_ENV;

module.exports = require(env === "test" ? "./mraa-mock" : 'mraa');
