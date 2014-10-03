/*
 * cylon-intel-iot
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';
var Mraa = require("./mraa");

var Utils = module.exports = {
  isGalileoGen1: function() {
    return Mraa.getPlatformType() === 0;
  },
  i2cPortFor: function() {
    if (Mraa.getPlatformType() === 2) {
      return 6;
    } else {
      return 0;
    }
  }
}
