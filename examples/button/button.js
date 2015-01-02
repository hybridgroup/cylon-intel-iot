"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    edison: { adaptor: "intel-iot" }
  },

  devices: {
    led: { driver: "led", pin: 13 },
    button: { driver: "button", pin: 2 }
  },

  work: function(my) {
    my.button.on("push", my.led.toggle);
  }
}).start();
