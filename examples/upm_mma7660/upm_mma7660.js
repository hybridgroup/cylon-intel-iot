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
    ax = my.mma7660.new_floatp();
    ay = my.mma7660.new_floatp();
    az = my.mma7660.new_floatp();

    my.mma7660.setModeStandby();
    my.mma7660.setSampleRate(1);
    my.mma7660.setModeActive();

    every(100, function() {
      my.mma7660.getAcceleration(ax, ay, az);
      console.log("ax, ay, az:", ax, ay, az);
    });
  }
}).start();
