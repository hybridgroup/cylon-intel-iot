"use strict";
var Cylon = require("cylon");

Cylon.robot({
  connections: {
    joule: { adaptor: "intel-iot" }
  },

  devices: {
    leftMotor: { driver: "motor", pin: "32", directionPin: "28" },
    rightMotor: { driver: "motor", pin: "30", directionPin: "26" }
  },

  work: function(my) {
    my.leftMotor.forward(50);
    my.rightMotor.forward(50);

    after((5).seconds(), function() {
      my.leftMotor.backward(50);
      my.rightMotor.backward(50);
    });

    after((10).seconds(), function() {
      my.leftMotor.turnOff();
      my.rightMotor.turnOff();
    });
  }
}).start();
