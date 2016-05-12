"use strict";

var Adaptor = require("./lib/adaptor");

module.exports = {
  adaptors: ["intel-iot"],

  dependencies: ["cylon-gpio", "cylon-i2c"],

  adaptor: function(opts) {
    return new Adaptor(opts);
  }
};
