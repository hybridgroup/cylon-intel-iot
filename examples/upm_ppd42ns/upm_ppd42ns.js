"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    edison: { adaptor: "intel-iot" }
  },

  devices: {
    ppd42ns: { driver: "upm-ppd42ns", pin: 4 },
    led: {driver: "led", pin: 13}
  },

  work: function(my) {
    every(1000, my.led.toggle);
    every(30000, function() {
      console.log("Reading dust sensor...");
      
      var data = my.ppd42ns.getData();
      console.log("Low pulse occupancy: " + data.lowPulseOccupancy);
      console.log("Ratio: " + data.ratio);
      console.log("Concentration: " + data.concentration);
    });
  }
}).start();
