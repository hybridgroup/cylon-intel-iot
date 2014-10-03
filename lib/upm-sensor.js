/*
 * jsupm_hmc5883l driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');
var utils = require('./utils');
var upmDevices = {
  'upm-hmc5883l': {
    init: function() {
      var u = require('jsupm_hmc5883l');
      return new u.Hmc5883l(utils.i2cPortFor());
    },
    commands: [ 'direction', 'heading', 'coordinates', 'update' ]
  }, 
  'upm-lcm1602': {
    init: function() {
      var u = require('jsupm_i2lcd');
      return new u.Lcm1602(utils.i2cPortFor(), 0x27);
    },
    commands: [ 'write', 'setCursor', 'clear', 'home' ]
  }
};

var upmSensor = module.exports = function (opts) {
  upmSensor.__super__.constructor.apply(this, arguments);

  this.module = upmDevices[opts.name].init();
  this.setupCommands(upmDevices[opts.name].commands, this.module);
};

Cylon.Utils.subclass(upmSensor, Cylon.Driver);

upmSensor.prototype.start = function(callback) {
  callback();
};

upmSensor.prototype.halt = function(callback) {
  callback();
};

