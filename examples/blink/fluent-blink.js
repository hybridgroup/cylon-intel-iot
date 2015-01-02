"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("edison", { adaptor: "intel-iot" })
  .device("led", { driver: "led", pin: 13 })

  .on("ready", function(bot) {
    setInterval(function() {
      bot.led.toggle();
    }, 1000);
  });

Cylon.start();
