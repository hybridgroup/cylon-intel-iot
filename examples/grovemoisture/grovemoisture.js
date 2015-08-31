"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    edison: { adaptor: "intel-iot" }
  },

  devices: {
    sensor: {
      driver: "upm-grovemoisture",
      pin: 0
    }
  },

  work: function(my) {
    every((30).seconds(), function() {
      var value = my.sensor.value();
      console.log(value);
    });
  }

}).start();
