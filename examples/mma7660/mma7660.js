"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    edison: { adaptor: "intel-iot" }
  },

  devices: {
    accel: {
      driver: "upm-mma7660"
    }
  },

  work: function(my) {
    every(500, function() {
      var force = my.accel.getAcceleration();
      console.log({ x: force.x,
                    y: force.y,
                    z: force.z });
    });
  }

}).start();
