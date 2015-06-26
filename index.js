"use strict";

var Adaptor = require("./lib/adaptor"),
    Driver = require("./lib/upm-sensor");

module.exports = {
  adaptors: ["intel-iot"],
  drivers: ["upm-hmc5883l", "upm-lcm1602", "upm-jhd1313m1", "upm-grovetemp"],
  dependencies: ["cylon-gpio", "cylon-i2c"],

  adaptor: function(opts) {
    return new Adaptor(opts);
  },

  driver: function(opts) {
    return new Driver(opts);
  }
};
