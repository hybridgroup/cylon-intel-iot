'use strict';


var Adaptor = source("adaptor"),
    Utils = source("utils"),
    Mraa = source('mraa');

var MockPin = function(num) {
  this.pinNum = num;

  this.dir = stub();

  this.read = stub();
  this.write = stub();

  this.enable = stub();
  this.period_us = stub();
};

describe("Adaptor", function() {
  var adaptor;

  beforeEach(function() {
    adaptor = new Adaptor();
  });

  describe("constructor", function() {
    it('sets @pins to an empty array by default', function() {
      expect(adaptor.pins).to.be.eql([]);
    });

    it('sets @pwmPins to an empty array by default', function() {
      expect(adaptor.pwmPins).to.be.eql([]);
    });

    it('sets @analogPins to an empty array by default', function() {
      expect(adaptor.analogPins).to.be.eql([]);
    });

    it('interval to the provided interval, or 0.01 by default', function() {
      expect(adaptor.interval).to.be.eql(0.01);
      adaptor = new Adaptor({ interval: 0.1 });
      expect(adaptor.interval).to.be.eql(0.1);
    });

  });

  describe("#commands", function() {
    it("is an array of IOT commands", function() {
      expect(adaptor.commands).to.be.an('array');

      adaptor.commands.map(function(cmd) {
        expect(cmd).to.be.a('string');
      });
    });
  });

  describe("#firmwareName", function() {
    beforeEach(function() {
      stub(Mraa, 'getPlatformType');
    });

    afterEach(function() {
      Mraa.getPlatformType.restore();
    });

    context("the platform is the Gen1 Galileo (0)", function() {
      beforeEach(function() {
        Mraa.getPlatformType.returns(0);
      });

      it("returns 'Intel Galileo Gen1'", function() {
        expect(adaptor.firmwareName()).to.be.eql("Intel Galileo Gen1");
      });
    });

    context("the platform is the Gen2 Galileo (1)", function() {
      beforeEach(function() {
        Mraa.getPlatformType.returns(1);
      });

      it("returns 'Intel Galileo Gen2'", function() {
        expect(adaptor.firmwareName()).to.be.eql("Intel Galileo Gen2");
      });
    });

    context("the platform is the Edison (2)", function() {
      beforeEach(function() {
        Mraa.getPlatformType.returns(2);
      });

      it("returns 'Intel Edison'", function() {
        expect(adaptor.firmwareName()).to.be.eql("Intel Edison");
      });
    });

    context("otherwise", function() {
      beforeEach(function() {
        Mraa.getPlatformType.returns(-1);
      });

      it("returns 'Unknown Platform'", function() {
        expect(adaptor.firmwareName()).to.be.eql("Unknown Platform");
      });
    });
  });

  describe("#digitalRead", function() {
    var clock;

    beforeEach(function() {
      clock = sinon.useFakeTimers();
      stub(global, 'every');
      Mraa.DIR_IN = 100;

      adaptor.pins[1] = new MockPin(1);
    });

    afterEach(function() {
      clock.restore();
      global.every.restore();
      delete Mraa.DIR_IN
    });

    context("if the pin hasn't already been set", function() {
      beforeEach(function() {
        Mraa.Gpio = stub().returns(new MockPin);
        adaptor.pins = [];
      });

      afterEach(function() {
        delete Mraa.Gpio;
      });

      it("creates a new Mraa.Gpio pin", function() {
        adaptor.digitalRead(10);
        expect(Mraa.Gpio).to.be.calledWithNew;
        expect(Mraa.Gpio).to.be.calledWith(10);
      });
    });

    it("calls #dir on the pin, with the MRAA.DIR_IN value", function() {
      adaptor.digitalRead(1);
      expect(adaptor.pins[1].dir).to.be.calledWith(100);
    });

    it("calls #every with the adaptor's interval", function() {
      adaptor.digitalRead(1);
      expect(every).to.be.calledWith(adaptor.interval);
    });

    describe("every @interval", function() {
      var pin, callback;

      beforeEach(function() {
        callback = spy();

        pin = adaptor.pins[1];
        pin.read.returns(0.5);

        global.every.restore();

        adaptor.emit = spy();

        adaptor.digitalRead(1, callback);
        clock.tick(adaptor.interval);
      });

      afterEach(function() {
        stub(global, 'every');
      });

      it("reads the value from the pin", function() {
        expect(pin.read).to.be.called;
      });

      it("emits the value", function() {
        expect(adaptor.emit).to.be.calledWith('digitalRead', 0.5);
      });

      it("triggers the callback with the value", function() {
        expect(callback).to.be.calledWith(null, 0.5);
      });

      context("if the same value is returned twice", function() {
        beforeEach(function() {
          clock.tick(adaptor.interval);
        });

        it("does not emit or trigger the callback again", function() {
          expect(pin.read).to.be.calledTwice;
          expect(adaptor.emit).to.be.calledOnce;
          expect(callback).to.be.calledOnce;
        });
      })
    });
  });

  describe("#digitalWrite", function() {
    var pin
    beforeEach(function() {
      pin = adaptor.pins[1] = new MockPin(1);
      Mraa.DIR_OUT = 0;
      adaptor.digitalWrite(1, 1);
    });

    afterEach(function() {
      delete Mraa.DIR_OUT
    });

    context("if the pin isn't registered", function() {
      beforeEach(function() {
        Mraa.Gpio = stub().returns(new MockPin);
        adaptor.digitalWrite(10)
      });

      afterEach(function() {
        delete adaptor.pins[10];
        delete Mraa.Gpio;
      });

      it("creates a new GPIO pin", function() {
        expect(Mraa.Gpio).to.be.calledWithNew;
      });
    });

    it("writes the pin direction", function() {
      expect(pin.dir).to.be.calledWith(0);
    });

    it("writes the value to the pin", function() {
      expect(pin.write).to.be.calledWith(1);
    });

    it("returns the value", function() {
      expect(adaptor.digitalWrite(1, 0)).to.be.eql(0);
    });
  });

  describe("#analogRead", function() {
    var clock;

    beforeEach(function() {
      clock = sinon.useFakeTimers();
      stub(global, 'every');

      adaptor.analogPins[1] = new MockPin(1);
    });

    afterEach(function() {
      clock.restore();
      global.every.restore();
    });

    context("if the pin hasn't already been set", function() {
      beforeEach(function() {
        Mraa.Aio = stub().returns(new MockPin);
        adaptor.analogPins = [];
      });

      afterEach(function() {
        delete Mraa.Aio;
      });

      it("creates a new Mraa.Aio pin", function() {
        adaptor.analogRead(10);
        expect(Mraa.Aio).to.be.calledWithNew;
        expect(Mraa.Aio).to.be.calledWith(10);
      });
    });

    it("calls #every with the adaptor's interval", function() {
      adaptor.analogRead(1);
      expect(every).to.be.calledWith(adaptor.interval);
    });

    describe("every @interval", function() {
      var pin, callback;

      beforeEach(function() {
        callback = spy();

        pin = adaptor.analogPins[1];
        pin.read.returns(0.5);

        global.every.restore();

        adaptor.emit = spy();

        adaptor.analogRead(1, callback);
        clock.tick(adaptor.interval)
      });

      afterEach(function() {
        stub(global, 'every');
      })

      it("reads the value from the pin", function() {
        expect(pin.read).to.be.called;
      });

      it("emits the value", function() {
        expect(adaptor.emit).to.be.calledWith('analogRead', 0.5);
      });

      it("triggers the callback with the value", function() {
        expect(callback).to.be.calledWith(null, 0.5);
      });

      context("if the same value is returned twice", function() {
        beforeEach(function() {
          clock.tick(adaptor.interval);
        });

        it("does not emit or trigger the callback again", function() {
          expect(pin.read).to.be.calledTwice;
          expect(adaptor.emit).to.be.calledOnce;
          expect(callback).to.be.calledOnce;
        });
      });
    });
  });

  describe("#pwmWrite", function() {
    var pin;

    beforeEach(function() {
      pin = adaptor.pwmPins[1] = new MockPin(1);
      adaptor.pwmWrite(1, 1);
    });

    context("if the pin isn't registered", function() {
      beforeEach(function() {
        pin = new MockPin(10);
        Mraa.Pwm = stub().returns(pin);
        adaptor.pwmWrite(10, 0)
      });

      afterEach(function() {
        delete adaptor.pwmPins[10];
        delete Mraa.Pwm;
      });

      it("creates a new PWM pin", function() {
        expect(Mraa.Pwm).to.be.calledWithNew;
      });

      it("enables the pin", function() {
        expect(pin.enable).to.be.calledWith(true);
      });

      it("assigns the pin to @pwmPins", function() {
        expect(adaptor.pwmPins[10]).to.be.eql(pin);
      });

      it("doesn't normally set the period", function() {
        expect(pin.period_us).to.not.be.called;
      })

      context("if the board is a Galileo Gen1", function() {
        beforeEach(function() {
          delete adaptor.pwmPins[10];
          stub(Utils, 'isGalileoGen1').returns(true);
          adaptor.pwmWrite(10, 0);
        });

        afterEach(function() {
          Utils.isGalileoGen1.restore();
        });

        it('sets the period', function() {
          expect(pin.period_us).to.be.calledWith(500);
        });
      })
    });

    it("writes the value to the pin", function() {
      expect(pin.write).to.be.calledWith(1);
    });
  });

  describe("#i2cWrite", function() {
    var i2c, callback;

    beforeEach(function() {
      callback = spy();

      i2c = adaptor.i2c = {
        address: stub(),
        write: stub()
      };

      adaptor.i2cWrite('address', 'cmd', ['buff'])
    });

    it("writes the i2c address to the board", function() {
      expect(i2c.address).to.be.calledWith('address');
    });

    it("write the data to the board", function() {
      expect(i2c.write).to.be.calledWith(new Buffer(['cmd'].concat(['buff'])).toString())
    });

    it("triggers the callback, if provided", function() {
      callback = spy();
      adaptor.i2cWrite('address', 'cmd', ['buff'], callback);
      expect(callback).to.be.called;
    });
  });

  describe("#i2cRead", function() {
    var i2c, callback;

    beforeEach(function() {
      callback = spy();

      i2c = adaptor.i2c = {
        address: stub(),
        write: stub(),
        read: stub().returns('data')
      };

      adaptor.i2cRead('address', 'cmd', 'length', callback);
    });

    it("writes the i2c address to the board", function() {
      expect(i2c.address).to.be.calledWith('address');
    });

    it("write the command to the board", function() {
      expect(i2c.write).to.be.calledWith(new Buffer(['cmd']).toString())
    });

    it("triggers the callback", function() {
      expect(callback.firstCall.args[1].toString()).to.be.eql('data');
    });
  });

});
