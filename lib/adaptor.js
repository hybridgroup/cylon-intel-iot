/*
 * intel-iot adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2014-2016 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

var GalileoIO = require("galileo-io");

/**
 * An Intel-IoT Adaptor
 *
 * @constructor IntelIoT
 *
 * @param {Object} opts options object
 * @param {Number} [opts.interval] update interval
 */

var Adaptor = module.exports = function Adaptor(opts) {
  Adaptor.__super__.constructor.apply(this, arguments);
  opts = opts || {};

  this.events = [
   /**
    * Emitted when the Intel platform has new analogRead data
    *
    * @event analogRead
    * @value val the value from the pin
    */
   "analogRead",

   /**
    * Emitted when the Intel platform has new digitalRead data
    *
    * @event digitalRead
    * @value val the value from the pin
    */
   "digitalRead",

   /**
    * Emitted when the Intel platform has written a value to a digital pin
    *
    * @event digitalWrite
    */
   "digitalWrite"
  ];
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.commands = [
  "pins", "analogRead", "digitalRead", "digitalWrite", "pwmWrite",
  "servoWrite", "firmwareName", "i2cWrite", "i2cRead"
];

Adaptor.prototype.connect = function(callback) {
  this.connector = new GalileoIO();
  callback();
};

Adaptor.prototype.disconnect = function(callback) {
  callback();
};

/**
* Returns the Intel device's firmware name
*
* @return {String} the firmware name
*/
Adaptor.prototype.firmwareName = function() {
  return "Intel";
};

/**
* Reads values from an analog pin on the board.
*
* When values are read from the pin, emits then as (err, val) to the provided
* callback.
*
* Also emits values through the "analogRead" event.
*
* @param {Number} pinNum the analog pin to read from
* @param {Function} callback a function to be triggered when a value is read
* @return {void}
* @publish
*/
Adaptor.prototype.analogRead = function(pinNum, callback) {
  this.connector.analogRead(pinNum, callback);
};

/**
* Reads values from a digital pin on the board.
*
* When values are read from the pin, emits then as (err, val) to the provided
* callback.
*
* Also emits values through the "digitalRead" event.
*
* @param {Number} pinNum the digital pin to read from
* @param {Function} callback a function to be triggered when a value is read
* @return {void}
* @publish
*/
Adaptor.prototype.digitalRead = function(pinNum, callback) {
  this.connector.digitalRead(pinNum, callback);
};

/**
* Writes a value to a digital pin on the board.
*
* @param {Number} pinNum the digital pin to write to
* @param {Number} value the value to be written to the pin
* @param {Function} [callback] - (err, val) triggers when write is complete
* @return {void}
* @publish
*/
Adaptor.prototype.digitalWrite = function(pinNum, value, callback) {
  this.connector.digitalWrite(pinNum, value);
  if (typeof callback === "function") {
    callback();
  }
};

/**
* Writes a PWM value to a pin
*
* @param {Number} pin which pin to write a value to
* @param {Number} value 0..255 value to write to the pin
* @param {Function} callback function to be invoked when write is complete
* @return {void}
* @publish
*/
Adaptor.prototype.pwmWrite = function(pin, value, callback) {
  this.connector.pwmWrite(pin, value);
  if (typeof callback === "function") {
    callback();
  }
};

/**
* Writes a Servo value to a pin on the board.
*
* @param {Number} pin which pin to write a value to
* @param {Number} value 0..180 value to write to the pin
* @param {Function} callback function to be invoked when write is complete
* @return {void}
* @publish
*/
Adaptor.prototype.servoWrite = function(pin, value, callback) {
  this.pwmWrite(pin, value, callback);
};

/**
* Writes an I2C value to the board.
*
* @param {Number} address I2C address to write to
* @param {Number} cmd I2C command to write
* @param {Array} buff buffered data to write
* @param {Function} [callback] - (err, val) triggers when write is complete
* @return {void}
* @publish
*/
Adaptor.prototype.i2cWrite = function(address, cmd, buff, callback) {
  this.connector.i2cWrite(address, cmd, buff);
  if (typeof callback === "function") {
    callback();
  }
};

/**
* Reads an I2C value from the board.
*
* @param {Number} address I2C address to write to
* @param {Number} cmd I2C command to write
* @param {Number} length amount of data to read
* @param {Function} callback (err, val) function to trigger with value
* @return {void}
* @publish
*/
Adaptor.prototype.i2cRead = function(address, cmd, length, callback) {
  this.connector.i2cReadOnce(address, cmd, length, function(data) {
    callback(null, data);
  });
};
