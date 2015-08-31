"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    edison: { adaptor: "intel-iot" }
  },

  devices: {
    relay: {
      driver: "upm-groverelay",
      pin: 4
    }
  },

  work: function(my) {
    every((10).seconds(), function(){
      if (my.relay.isOff()) {
        my.relay.on();
        console.log("on");
      } else {
        my.relay.off();
        console.log("off");
      }
    });
  }

}).start();
