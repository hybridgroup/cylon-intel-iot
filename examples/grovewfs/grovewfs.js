"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    edison: { adaptor: "intel-iot" }
  },

  devices: {
    flow: {
      driver: "upm-grovewfs",
      pin: 2
    }
  },

  work: function(my) {
    my.flow.clearFlowCounter();
    my.flow.startFlowCounter();

    every((5).seconds(), function() {
      var value = my.flow.flowRate();
      console.log(value);
    });
  }

}).start();
