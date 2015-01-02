"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("edison", { adaptor: "intel-iot" })
  .device("led", { driver: "led", pin: 13 })
  .device("button", { driver: "button", pin: 2 })

  .on("ready", function(bot) {
    bot.button.on("push", function() {
      bot.led.toggle();
    });
  });

Cylon.start();
