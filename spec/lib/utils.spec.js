'use strict';

var Utils = source("utils"),
    Mraa = source('mraa');

describe("Utils", function() {
  describe("#isGalileoGen1", function() {
    it("checks the platform type", function() {
      expect(Utils.isGalileoGen1()).to.be.eql(false);
    })
  });
  describe("#i2cPortFor", function() {
    it("returns the correct i2c port for the current platform", function() {
      expect(Utils.i2cPortFor()).to.be.eql(0);
      stub(Mraa, 'getPlatformType').returns(2);
      expect(Utils.i2cPortFor()).to.be.eql(6);
      expect(Mraa.getPlatformType).to.be.called;
      Mraa.getPlatformType.restore();
    })
  });
});
