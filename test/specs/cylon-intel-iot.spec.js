"use strict";

var GPIO = require('cylon-gpio'),
    I2C = require('cylon-i2c');

var module = source("cylon-intel-iot");

var Adaptor = source('adaptor');

describe("cylon-intel-iot", function() {
  describe("#register", function() {
    var bot;

    beforeEach(function() {
      bot = { 
        registerAdaptor: spy(),
        registerDriver: spy() 
      };
      stub(GPIO, 'register');
      stub(I2C, 'register');
      module.register(bot);
    });

    afterEach(function() {
      GPIO.register.restore();
      I2C.register.restore();
    });

    it("registers the 'intel-iot' adaptor with the robot", function() {
      expect(bot.registerAdaptor).to.be.calledWith('cylon-intel-iot', 'intel-iot');
    });

    it("registers the robot with the GPIO module", function() {
      expect(GPIO.register).to.be.calledWith(bot);
    });

    it("registers the robot with the I2C module", function() {
      expect(GPIO.register).to.be.calledWith(bot);
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
