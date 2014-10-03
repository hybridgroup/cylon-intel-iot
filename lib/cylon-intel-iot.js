/*
 * intel-iot
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var Adaptor = require('./adaptor'),
  GPIO = require('cylon-gpio'),
  I2C = require('cylon-i2c'),
  upmSensor = require('./upm-sensor');

module.exports = {
  adaptor: function(opts) {
    return new Adaptor(opts);
  },
  driver: function(opts) {
    return new upmSensor(opts);
  },
  register: function(robot) {
    Cylon.Logger.debug("Registering intel-iot adaptor for " + robot.name);
    robot.registerAdaptor('cylon-intel-iot', 'intel-iot');

    Cylon.Logger.debug("Registering upm-hmc5883l Driver for " + robot.name);
    robot.registerDriver('cylon-intel-iot', 'upm-hmc5883l');

    Cylon.Logger.debug("Registering upm-lcm1602 Driver for " + robot.name);
    robot.registerDriver('cylon-intel-iot', 'upm-lcm1602');

    GPIO.register(robot);
    I2C.register(robot);
  }
};
