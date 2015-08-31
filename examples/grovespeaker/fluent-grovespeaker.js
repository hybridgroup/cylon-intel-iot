"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("edison", { adaptor: "intel-iot" })
  .device("speaker", {
    driver: "upm-grovespeaker",
    pin: 4
  })

  .on("ready", function(bot) {
    bot.speaker.playSound("a", true, "low");
    bot.speaker.playSound("c", true, "low");
    bot.speaker.playSound("d", true, "low");
    bot.speaker.playSound("b", false, "low");
  });

Cylon.start();
