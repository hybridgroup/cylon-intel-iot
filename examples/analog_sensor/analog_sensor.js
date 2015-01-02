"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    edison: { adaptor: "intel-iot" }
  },

  devices: {
    sensor: {
      driver: "analogSensor",
      pin: 0,
      upperLimit: 900,
      lowerLimit: 100
    }
  },

  work: function(my) {
    my.sensor.on("upperLimit", function(val) {
      console.log("Upper limit reached ===> " + val);
    });

    my.sensor.on("lowerLimit", function(val) {
      console.log("Lower limit reached ===> " + val);
    });
  }

}).start();
