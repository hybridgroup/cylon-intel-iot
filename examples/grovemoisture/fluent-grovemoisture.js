"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("edison", { adaptor: "intel-iot" })
  .device("sensor", {
    driver: "upm-grovemoisture",
    pin: 0
  })

  .on("ready", function(bot) {
    var value;
    setInterval(function() {
      value = bot.sensor.value();
      console.log(value);
    }, 30000);
  });

Cylon.start();
