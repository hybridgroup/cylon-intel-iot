var cylon = require('cylon');

cylon.robot({
  connection: { name: 'edison', adaptor: 'intel-iot' },

  device: {
    name: 'sensor',
    driver: 'analogSensor',
    pin: 0,
    upperLimit: 900,
    lowerLimit: 100
  }
})

.on('ready', function(robot) {
  robot.sensor.on('upperLimit', function(val) {
    console.log("Upper limit reached ===> " + val);
  });

  robot.sensor.on('lowerLimit', function(val) {
    console.log("Lower limit reached ===> " + val);
  });
})

.start();
