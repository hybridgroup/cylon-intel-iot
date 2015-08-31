/*
 * generic upm driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");
var utils = require("./utils");
var upmDevices = {
  "upm-grovemoisture": {
    init: function(pin) {
      var u = require("jsupm_grovemoisture");
      return new u.GroveMoisture(pin);
    },
    commands: ["value", "name"]
  },
  "upm-groverelay": {
    init: function(pin) {
      var u = require("jsupm_grove");
      var driver = new u.GroveRelay(pin);
      // avoid function name conflict with eventemitter
      driver.turnOn = driver.on;
      driver.turnOff = driver.off;
      return driver;
    },
    commands: ["turnOn", "turnOff", "isOn", "isOff", "name"]
  },
  "upm-grovespeaker": {
    init: function(pin) {
      var u = require("jsupm_grovespeaker");
      return new u.GroveSpeaker(pin);
    },
    commands: ["playAll", "playSound"]
  },
  "upm-grovetemp": {
    init: function(pin) {
      var u = require("jsupm_grove");
      return new u.GroveTemp(pin);
    },
    commands: ["value"]
  },
  "upm-grovewfs": {
    init: function(pin) {
      var u = require("jsupm_grovewfs");
      return new u.GroveWFS(pin);
    },
    commands: ["clearFlowCounter", "startFlowCounter",
               "getMillis", "flowCounter", "flowRate",
               "stopFlowCounter"]
  },
  "upm-adxl345": {
    init: function() {
      var u = require("jsupm_adxl345");
      return new u.Adxl345(utils.i2cPortFor());
    },
    commands: ["getAcceleration", "update"]
  },
  "upm-at42qt1070": {
    init: function() {
      var u = require("jsupm_at42qt1070");
      return new u.AT42QT1070(u.AT42QT1070_I2C_BUS,
                              u.AT42QT1070_DEFAULT_I2C_ADDR);
    },
    commands: ["getButtons", "updateState"]
  },
  "upm-biss0001": {
    init: function(pin) {
      var u = require("jsupm_biss0001");
      return new u.BISS0001(pin);
    },
    commands: ["value"]
  },
  "upm-bmpx8x": {
    init: function() {
      var u = require("jsupm_bmpx8x");
      return new u.Hmc5883l(utils.i2cPortFor(), 0x77);
    },
    commands: ["getPressure", "getTemperature",
               "getAltitude", "getSealevelPressure" ]
  },
  "upm-hmc5883l": {
    init: function() {
      var u = require("jsupm_hmc5883l");
      return new u.Hmc5883l(utils.i2cPortFor());
    },
    commands: ["direction", "heading", "coordinates", "update" ]
  },
  "upm-jhd1313m1": {
    init: function() {
      var u = require("jsupm_i2clcd");
      return new u.Jhd1313m1(utils.i2cPortFor(), 0x3E, 0x62);
    },
    commands: ["scroll", "setColor", "write", "setCursor", "clear", "home"]
  },
  "upm-lcm1602": {
    init: function() {
      var u = require("jsupm_i2clcd");
      return new u.Lcm1602(utils.i2cPortFor(), 0x27);
    },
    commands: ["write", "setCursor", "clear", "home" ]
  },
  "upm-ldt0028": {
    init: function() {
      var u = require("jsupm_ldt0028");
      return new u.LDT0028(0);
    },
    commands: ["getSample", "name"]
  },
  "upm-mma7660": {
    init: function() {
      var u = require("jsupm_mma7660");
      return new u.MMA7660(u.MMA7660_I2C_BUS,
                           u.MMA7660_DEFAULT_I2C_ADDR);
    },
    commands: ["getRawValues", "getAcceleration",
               "getVerifiedAxis", "getVerifiedTilt",
               "tiltTap", "tiltShake"]
  },
  "upm-otp538u": {
    init: function(pin1, pin2) {
      var u = require("jsupm_otp538u");
      return new u.OTP538U(pin1, pin2);
    },
    commands: ["ambientTemperature", "objectTemperature"]
  },
  "upm-rfr359f": {
    init: function(pin) {
      var u = require("jsupm_rfr359f");
      return new u.RFR359F(pin);
    },
    commands: ["objectDetected"]
  },
  "upm-ssd1308": {
    init: function() {
      var u = require("jsupm_i2clcd");
      return new u.SSD1308(utils.i2cPortFor(), 0x3C);
    },
    commands: ["clear", "home", "write"]
  },
  "upm-tp401": {
    init: function(pin) {
      var u = require("jsupm_gas");
      return new u.TP401(pin);
    },
    commands: ["getSample", "getPPM"]
  },
  "upm-tsl2561": {
    init: function() {
      var u = require("jsupm_tsl2561");
      return new u.TSL2561();
    },
    commands: ["getLux", "name"]
  },
  "upm-yg1006": {
    init: function(pin) {
      var u = require("jsupm_yg1006");
      return new u.YG1006(pin);
    },
    commands: ["flameDetected"]
  }
};

var upmSensor = module.exports = function(opts) {
  upmSensor.__super__.constructor.apply(this, arguments);

  this.module = upmDevices[opts.driver].init(opts.pin);
  this.setupCommands(upmDevices[opts.driver].commands, this.module);
};

Cylon.Utils.subclass(upmSensor, Cylon.Driver);

upmSensor.prototype.start = function(callback) {
  callback();
};

upmSensor.prototype.halt = function(callback) {
  callback();
};

