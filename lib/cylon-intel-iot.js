/*
 * intel-iot
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Adaptor = require('./adaptor'),
    Driver = require('./upm-sensor');

module.exports = {
  adaptors: ['intel-iot'],
  drivers: ['upm-hmc5883l', 'upm-lcm1602', 'upm-jhd1313m1'],
  dependencies: ['cylon-gpio', 'cylon-i2c'],

  adaptor: function(opts) {
    return new Adaptor(opts);
  },

  driver: function(opts) {
    return new Driver(opts);
  }
};
