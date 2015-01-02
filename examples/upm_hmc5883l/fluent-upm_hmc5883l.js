"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("edison", { adaptor: "intel-iot" })
  .device("hmc5883l", { driver: "upm-hmc5883l" })
  .on("ready", function(bot) {
    setInterval(function() {
      bot.hmc5883l.update();
      console.log("heading: " + bot.hmc5883l.heading());
    }, 1000);
  });

Cylon.start();
