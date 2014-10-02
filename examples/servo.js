var cylon = require('cylon');

var robot = cylon.robot({
  connection: { name: 'edison', adaptor: 'intel-iot'},
  device: { name: 'servo', 
    driver: 'servo', 
    pin: 3, 
  }
});

robot.on('ready', function() {
  var angle = 0,
  increment = 20;

  setInterval(function() {
    angle += increment;

    robot.servo.angle(angle);

    console.log("Current Angle: " + (robot.servo.currentAngle()));

    if ((angle === 0) || (angle === 180)) {
      increment = -increment;
    }
  }, 1000);
})
  .on('error', function(err) {
    console.log(err);
  })
  .start();
