"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("edison", { adaptor: "intel-iot" })
  .device("flow", {
    driver: "upm-grovewfs",
    pin: 2
  })

  .on("ready", function(bot) {
    bot.flow.clearFlowCounter();
    bot.flow.startFlowCounter();

    var value;
    setInterval(function() {
      value = bot.flow.flowRate();
      console.log(value);
    }, 5000);
  });

Cylon.start();
