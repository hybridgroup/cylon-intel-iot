/*
 * intel-iot adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var Mraa = require('./mraa');
var utils = require('./utils');

var MIN_PULSE_WIDTH = 600;
var MAX_PULSE_WIDTH = 2500;
var MAX_PERIOD = 7968;

var Adaptor = module.exports = function Adaptor(opts) {
  Adaptor.__super__.constructor.apply(this, arguments);
  opts = opts || {};

  this.pins = [];
  this.pwmPins = [];
  this.analogPins = [];
  this.interval = opts.interval || 0.01;
  this.i2c = null;
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function(callback) {
  callback();
};

Adaptor.prototype.disconnect = function(callback) {
  callback();
};

Adaptor.prototype.commands = [
  'digitalRead', 'digitalWrite', 'pwmWrite', 'servoWrite',
  'analogRead', 'servoWrite', 'firmwareName', 'i2cWrite', 'i2cRead'
];

Adaptor.prototype.firmwareName = function() {
  switch(Mraa.getPlatformType()) {
    case 0:
      return "Intel Galileo Gen1";

    case 1:
      return "Intel Galileo Gen2";

    case 2:
      return "Intel Edison";

    default:
      return "Unknown Platform";
  }
};

Adaptor.prototype.digitalRead = function(pin, callback) {
  var prev;

  pin = parseInt(pin, 10);

  if (!this.pins[pin]) {
    this.pins[pin] = new Mraa.Gpio(pin);
  }

  this.pins[pin].dir(Mraa.DIR_IN);

  every(this.interval, function() {
    var val = this.pins[pin].read();

    if (val !== prev) {
      prev = val;
      this.emit('digitalRead', val);
      callback(null, val);
    }
  }.bind(this));
};

Adaptor.prototype.digitalWrite = function(pin, value) {
  pin = parseInt(pin, 10);
  value = parseInt(value, 10);
  if (this.pins[pin] == null) {
    this.pins[pin] = new Mraa.Gpio(pin);
  }
  this.pins[pin].dir(Mraa.DIR_OUT);
  this.pins[pin].write(value);
  return value;
};

Adaptor.prototype.analogRead = function(pin, callback) {
  var prev;

  pin = parseInt(pin, 10);

  if (!this.analogPins[pin]) {
    this.analogPins[pin] = new Mraa.Aio(pin);
  }

  every(this.interval, function() {
    var val = this.analogPins[pin].read();

    if (val !== prev) {
      prev = val;
      this.emit('analogRead', val);
      callback(null, val);
    }
  }.bind(this));
};

Adaptor.prototype.servoWrite = function(pin, value) {
  this.pwmWrite(pin, MIN_PULSE_WIDTH + value * (MAX_PULSE_WIDTH - MIN_PULSE_WIDTH), true);
};

Adaptor.prototype.pwmWrite = function(pinNum, value, servo) {
  pinNum = parseInt(pinNum, 10);

  var pin = this.pwmPins[pinNum];

  if (!pin) {
    pin = new Mraa.Pwm(pinNum);

    if (utils.isGalileoGen1()) {
      pin.period_us(500);
    }

    pin.enable(true);

    this.pwmPins[pinNum] = pin;
  }

  if (servo === true) {
    pin.period_us(MAX_PERIOD);
    pin.pulsewidth_us(value);
  } else {
    pin.write(value);
  }
};

Adaptor.prototype.i2cWrite = function(address, cmd, buff, callback) {
  if (this.i2c == null) {
    this.i2c = new Mraa.I2c(utils.i2cPortFor());
  }
  this.i2c.address(address);
  this.i2c.write(new Buffer([cmd].concat(buff)).toString());
  if ('function' === typeof(callback)) { callback(); }
};

Adaptor.prototype.i2cRead = function(address, cmd, length, callback) {
  if (this.i2c == null) {
    this.i2c = new Mraa.I2c(utils.i2cPortFor());
  }
  this.i2c.address(address);
  this.i2c.write(new Buffer([cmd]).toString());
  var data = this.i2c.read(length);
  callback(null, new Buffer(data, 'ascii'));
};
