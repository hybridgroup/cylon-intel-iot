"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    edison: { adaptor: "intel-iot" }
  },

  devices: {
    hmc5883l: { driver: "upm-hmc5883l" }
  },

  work: function(my) {
    every((1).second(), function() {
      my.hmc5883l.update();
      console.log("heading: " + my.hmc5883l.heading());
    });
  }
}).start();
