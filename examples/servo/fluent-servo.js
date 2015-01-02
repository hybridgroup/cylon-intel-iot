"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("edison", { adaptor: "intel-iot"})
  .device("servo", { driver: "servo", pin: 3, })
  .on("ready", function(bot) {
    var angle = 0,
    increment = 20;

    setInterval(function() {
      angle += increment;

      bot.servo.angle(angle);

      console.log("Current Angle: " + (bot.servo.currentAngle()));

      if ((angle === 0) || (angle === 180)) {
        increment = -increment;
      }
    }, 1000);
  });

Cylon.start();
