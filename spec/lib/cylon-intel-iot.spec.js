"use strict";

var iot = lib("../");

var Adaptor = lib("adaptor");

describe("cylon-intel-iot", function() {
  describe("#adaptors", function() {
    it("is an array of supplied adaptors", function() {
      expect(iot.adaptors).to.be.eql(["intel-iot"]);
    });
  });

  describe("#drivers", function() {
    it("is an array of supplied drivers", function() {
      var drivers = ["upm-grovemoisture", "upm-groverelay",
            "upm-grovespeaker", "upm-grovetemp",
            "upm-grovewfs", "upm-adxl345",
            "upm-at42qt1070", "upm-biss0001",
            "upm-bmpx8x", "upm-hmc5883l",
            "upm-jhd1313m1", "upm-lcm1602",
            "upm-ldt0028", "upm-mma7660",
            "upm-otp538u", "upm-rfr359f",
            "upm-ssd1308", "upm-tp401",
            "upm-tsl2561", "upm-yg1006"];
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
