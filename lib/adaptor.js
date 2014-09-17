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
  this.pwmPins = [];
  this.analogPins = [];
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

Adaptor.prototype.connect = function() {
  Adaptor.__super__.connect.apply(this, arguments);
};

Adaptor.prototype.commands = [
  'digitalRead', 'digitalWrite', 'pwmWrite',
  'analogRead', 'servoWrite', 'firmwareName', 'i2cWrite', 'i2cRead'
];

Adaptor.prototype.firmwareName = function() {
  var msg = '';
  switch(Mraa.getPlatformType()) {
    case 0:
      msg = "Intel Galileo Gen1";
      break;
    case 1:
      msg = "Intel Galileo Gen2";
      break;
    case 2:
      msg = "Intel Edison";
      break;
    default:
      msg = "Unknown Platform";
      break;
  }

  return msg;
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
  if (this.analogPins[pin] == null) {
    this.analogPins[pin] = new Mraa.Aio(pin);
  }

  var prev;
  every(this.interval, function() {
    var val = this.analogPins[pin].read();
    if (val !== prev) {
      this.emit('analogRead', val);
      prev = val;
      callback(val);
    }
  }.bind(this));
};


Adaptor.prototype.pwmWrite = function(pinNum, value) {
  pinNum = parseInt(pinNum);
  var pin = this.pwm_pins[pinNum];
  if (pin == null) {
    pin = new Mraa.Pwm(pinNum);
    pin.period_us(500);
    pin.enable(true);
    this.pwm_pins[pinNum] = pin;
  }
  pin.write(value);
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
