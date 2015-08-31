"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("edison", { adaptor: "intel-iot" })
  .device("relay", {
    driver: "upm-groverelay",
    pin: 4
  })

  .on("ready", function(bot) {
    setInterval(function() {
      if (bot.relay.isOff()) {
        bot.relay.turnOn();
        console.log("on");
      } else {
        bot.relay.turnOff();
        console.log("off");
      }
    }, 10000);
  });

Cylon.start();
