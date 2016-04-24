"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    edison: { adaptor: "intel-iot" }
  },

  devices: {
    mma7660: { driver: "upm-mma7660" }
  },

  work: function(my) {
    var ax, ay, az;
    ax = my.mma7660.newFloatP();
    ay = my.mma7660.newFloatP();
    az = my.mma7660.newFloatP();

    my.mma7660.setModeStandby();
    my.mma7660.setSampleRate(1);
    my.mma7660.setModeActive();

    every(100, function() {
      my.mma7660.getAcceleration(ax, ay, az);
      var x = my.mma7660.floatPValue(ax);
      var y = my.mma7660.floatPValue(ay);
      var z = my.mma7660.floatPValue(az);
      console.log("x, y, z:", x, y, z);
    });
  }
}).start();
