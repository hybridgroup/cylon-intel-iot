"use strict";

var iot = lib("../");

var Adaptor = lib("adaptor");

describe("cylon-intel-iot", function() {
  describe("#adaptors", function() {
    it("is an array of supplied adaptors", function() {
      expect(iot.adaptors).to.be.eql(["intel-iot"]);
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
