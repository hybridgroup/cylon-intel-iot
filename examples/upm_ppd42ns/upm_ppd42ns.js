"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    edison: { adaptor: "intel-iot" }
  },

  devices: {
    ppd42ns: { driver: "upm-ppd42ns", pin: 4 }
  },

  work: function(my) {
    every(100, function() {
      var data = my.ppd42ns.getData();
      console.log("Low pulse occupancy: " + data.lowPulseOccupancy);
      console.log("Ratio: " + data.ratio);
      console.log("Concentration: " + data.concentration);
    });
  }
}).start();
