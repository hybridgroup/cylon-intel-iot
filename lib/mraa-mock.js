/*
 * intel-iot - mock MRAA implementation
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

// this is a mock implementation of the Mraa module, for use during testing.

var Mraa = module.exports = {
  getPlatformType: function() {
    return 1;
  },
};

Mraa.I2c = function I2c() {
};
