"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    edison: { adaptor: "intel-iot"}
  },

  devices: {
    servo: { driver: "servo", pin: 3, }
  },

  work: function(my) {
    var angle = 0,
    increment = 20;

    every((1).second(), function() {
      angle += increment;

      my.servo.angle(angle);

      console.log("Current Angle: " + (my.servo.currentAngle()));

      if ((angle === 0) || (angle === 180)) {
        increment = -increment;
      }
    });
  }
}).start();
