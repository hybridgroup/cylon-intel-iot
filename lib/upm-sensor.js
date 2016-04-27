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
    commands: [ "scroll", "setColor", "write", "setCursor", "clear", "home" ]
  },
  "upm-grovetemp": {
    init: function(pin) {
      var u = require("jsupm_grove");
      return new u.GroveTemp(pin);
    },
    commands: [ "value" ]
  },
  "upm-mma7660": {
    init: function() {
      var u = require("jsupm_mma7660");
      var d = new u.MMA7660(utils.i2cPortFor(), 0x4c);
      d.newFloatP = u.new_floatp;
      d.floatPValue = u.floatp_value;
      return d;
    },
    commands: [ "setModeStandby", "setModeActive", "setSampleRate",
                "newFloatP", "floatPValue",
                "getAcceleration", "getRawValues",
                "getVerifiedAxis", "getVerifiedTilt",
                "tiltBackFront", "tiltLandscapePortrait",
                "tiltTap", "tiltShake" ]
  },
  "upm-ppd42ns": {
    init: function(pin) {
      var u = require("jsupm_ppd42ns");
      return new u.PPD42NS(pin);
    },
    commands: [ "getData" ]
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
