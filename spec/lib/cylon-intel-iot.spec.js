/* jshint expr:true */
"use strict";

var iot = source("cylon-intel-iot");

var Adaptor = source("adaptor");

describe("cylon-intel-iot", function() {
  describe("#adaptors", function() {
    it("is an array of supplied adaptors", function() {
      expect(iot.adaptors).to.be.eql(["intel-iot"]);
    });
  });

  describe("#drivers", function() {
    it("is an array of supplied drivers", function() {
      var drivers = ["upm-hmc5883l", "upm-lcm1602", "upm-jhd1313m1"];
      expect(iot.drivers).to.be.eql(drivers);
    });
  });

  describe("#dependencies", function() {
    it("is an array of supplied dependencies", function() {
      expect(iot.dependencies).to.be.eql(["cylon-gpio", "cylon-i2c"]);
    });
  });

  describe("#adaptor", function() {
    it("returns an instance of the Adaptor", function() {
      expect(iot.adaptor()).to.be.instanceOf(Adaptor);
    });

    it("passes arguments to the Adaptor constructor", function() {
      var adaptor = iot.adaptor({ name: "new adaptor" });
      expect(adaptor.name).to.be.eql("new adaptor");
    });
  });
});
