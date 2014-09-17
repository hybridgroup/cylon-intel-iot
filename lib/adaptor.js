/*
 * intel-iot adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var Mraa = require('./mraa-shim');

var Adaptor = module.exports = function Adaptor(opts) {
  this.pins = [];
  this.pwm_pins = [];
  this.analog_pins = [];
  var params = opts || {};
  var extraParams = params.extraParams || {};
  this.interval = extraParams.interval || 0.01;
  if (Mraa.getPlatformType() === 2) {
    this.i2c = new Mraa.I2c(6);
  } else {
    this.i2c = new Mraa.I2c(0);
  }
  Adaptor.__super__.constructor.apply(this, arguments);
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function(callback) {
  Adaptor.__super__.connect.apply(this, arguments);
};

Adaptor.prototype.commands = [
  'digitalRead', 'digitalWrite', 'pwmWrite',
  'analogRead', 'servoWrite', 'firmwareName', 'i2cWrite', 'i2cRead'
];

Adaptor.prototype.firmwareName = function() {
  switch(Mraa.getPlatformType()) {
    case 0:
      return "Intel Galileo Gen1";
      break;
    case 1:
      return "Intel Galileo Gen2";
      break;
    case 2:
      return "Intel Edison";
      break;
    default:
      return "Unknown Platform";
      break;
  }
};

Adaptor.prototype.digitalRead = function(pin, callback) {
  pin = parseInt(pin);
  if (this.pins[pin] == null) {
    this.pins[pin] = new Mraa.Gpio(pin);
  }
  this.pins[pin].dir(Mraa.DIR_IN);

  var prev;
  every(this.interval, function() {
    var val = this.pins[pin].read();
    if (val !== prev) {
      this.emit('digitalRead', val);
      prev = val;
      callback(val);
    }
  }.bind(this));
};

Adaptor.prototype.digitalWrite = function(pin, value) {
  pin = parseInt(pin);
  value = parseInt(value);
  if (this.pins[pin] == null) {
    this.pins[pin] = new Mraa.Gpio(pin);
  }
  this.pins[pin].dir(Mraa.DIR_OUT);
  this.pins[pin].write(value);
  return value;

};

Adaptor.prototype.analogRead = function(pin, callback) {
  pin = parseInt(pin);
  if (this.analog_pins[pin] == null) {
    this.analog_pins[pin] = new Mraa.Aio(pin);
  }

  var prev;
  every(this.interval, function() {
    var val = this.analog_pins[pin].read();
    if (val !== prev) {
      this.emit('analogRead', val);
      prev = val;
      callback(val);
    }
  }.bind(this));
};

Adaptor.prototype.pwmWrite = function(pin, value) {
  pin = parseInt(pin);
  if (this.pwm_pins[pin] == null) {
    this.pwm_pins[pin] = new Mraa.Pwm(pin);
    this.pwm_pins[pin].enable(true); 
  }
  this.pwm_pins[pin].write(value);
};

Adaptor.prototype.i2cWrite = function(address, cmd, buff, callback) {
  this.i2c.address(address);
  this.i2c.write(new Buffer([cmd].concat(buff)).toString());
  if ('function' === typeof(callback)) { callback(); }
};

Adaptor.prototype.i2cRead = function(address, cmd, length, callback) {
  this.i2c.address(address);
  this.i2c.write(new Buffer([cmd]).toString());
  var data = this.i2c.read(length);
  callback(null, new Buffer(data, 'ascii'));
};
