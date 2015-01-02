"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("edison", { adaptor: "intel-iot" })
  .device("sensor", {
    driver: "analogSensor",
    pin: 0,
    upperLimit: 900,
    lowerLimit: 100
  })

  .on("ready", function(bot) {
    bot.sensor.on("upperLimit", function(val) {
      console.log("Upper limit reached ===> " + val);
    });

    bot.sensor.on("lowerLimit", function(val) {
      console.log("Lower limit reached ===> " + val);
    });
  });

Cylon.start();
