"use strict";

var Adaptor = require("./lib/adaptor"),
    Driver = require("./lib/upm-sensor");

module.exports = {
  adaptors: ["intel-iot"],
  drivers: ["upm-grovemoisture", "upm-groverelay",
            "upm-grovespeaker", "upm-grovetemp",
            "upm-grovewfs", "upm-adxl345",
            "upm-at42qt1070", "upm-biss0001",
            "upm-bmpx8x", "upm-hmc5883l",
            "upm-jhd1313m1", "upm-lcm1602",
            "upm-ldt0028", "upm-mma7660",
            "upm-otp538u", "upm-rfr359f",
            "upm-ssd1308", "upm-tp401",
            "upm-tsl2561", "upm-yg1006"],
  dependencies: ["cylon-gpio", "cylon-i2c"],

  adaptor: function(opts) {
    return new Adaptor(opts);
  },

  driver: function(opts) {
    return new Driver(opts);
  }
};
