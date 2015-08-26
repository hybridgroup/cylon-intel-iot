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
  "upm-hmc5883l": {
    init: function() {
      var u = require("jsupm_hmc5883l");
      return new u.Hmc5883l(utils.i2cPortFor());
    },
    commands: [ "direction", "heading", "coordinates", "update" ]
  },
  "upm-lcm1602": {
    init: function() {
      var u = require("jsupm_i2clcd");
      return new u.Lcm1602(utils.i2cPortFor(), 0x27);
    },
    commands: [ "write", "setCursor", "clear", "home" ]
  },
  "upm-jhd1313m1": {
    init: function() {
      var u = require("jsupm_i2clcd");
      return new u.Jhd1313m1(utils.i2cPortFor(), 0x3E, 0x62);
    },
    commands: [ "scroll", "setColor", "write", "setCursor", "clear", "home"]
  },
  "upm-grovetemp": {
    init: function(pin) {
      var u = require("jsupm_grove");
      return new u.GroveTemp(pin);
    },
    commands: [ "value"]
  },
  "upm-mma7660": {
    init: function(pin) {
      var u = require("jsupm_mma7660");
      return new u.MMA7660(u.MMA7660_I2C_BUS,
                           u.MMA7660_DEFAULT_I2C_ADDR);
    },
    commands: [ "getRawValues", "getAcceleration", "getVerifiedAxis", "getVerifiedTilt", "tiltTap", "tiltShake"]
  },
  "upm-ldt0028": {
    init: function(pin) {
      var u = require("jsupm_ldt0028");
      return new u.LDT0028(0);
    },
    commands: [ "getSample", "name"]
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

