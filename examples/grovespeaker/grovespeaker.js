"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    edison: { adaptor: "intel-iot" }
  },

  devices: {
    speaker: {
      driver: "upm-grovespeaker",
      pin: 4
    }
  },

  work: function(my) {
    my.speaker.playSound("a", true, "low");
    my.speaker.playSound("c", true, "low");
    my.speaker.playSound("d", true, "low");
    my.speaker.playSound("b", false, "low");
  }

}).start();
