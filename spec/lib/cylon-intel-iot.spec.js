"use strict";

var GPIO = require('cylon-gpio'),
    I2C = require('cylon-i2c');

var module = source("cylon-intel-iot");

var Adaptor = source('adaptor');

describe("cylon-intel-iot", function() {
  describe("#adaptors", function() {
    it('is an array of supplied adaptors', function() {
      expect(module.adaptors).to.be.eql(['intel-iot']);
    });
  });

  describe("#drivers", function() {
    it('is an array of supplied drivers', function() {
      var drivers = ['upm-hmc5883l', 'upm-lcm1602', 'upm-jhd1313m1'];
      expect(module.drivers).to.be.eql(drivers);
    });
  });

  describe("#dependencies", function() {
    it('is an array of supplied dependencies', function() {
      expect(module.dependencies).to.be.eql(['cylon-gpio', 'cylon-i2c']);
    });
  });

  describe("#adaptor", function() {
    it("returns an instance of the Adaptor", function() {
      expect(module.adaptor()).to.be.instanceOf(Adaptor);
    });

    it("passes arguments to the Adaptor constructor", function() {
      var adaptor = module.adaptor({ name: "new adaptor" });
      expect(adaptor.name).to.be.eql("new adaptor");
    });
  });
});
