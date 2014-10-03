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
var jsupm_hmc5883l = require('jsupm_hmc5883l');

var hmc5883l = module.exports = function () {
  hmc5883l.__super__.constructor.apply(this, arguments);

  this.module = new jsupm_hmc5883l.Hmc5883l(utils.i2cPortFor())

  this.setupCommands([
    'direction', 'heading', 'coordinates', 'update'
  ], this.module);
};

Cylon.Utils.subclass(hmc5883l, Cylon.Driver);

hmc5883l.prototype.start = function(callback) {
  callback();
};

hmc5883l.prototype.halt = function(callback) {
  callback();
};
