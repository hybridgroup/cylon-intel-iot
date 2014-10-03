var cylon = require('cylon');

cylon.robot({
  connection: {name: 'edison', adaptor: 'intel-iot'},
  device: {name: 'hmc5883l', driver: 'upm-hmc5883l'}
}).on('ready', function(robot) {
    setInterval(function() {
      robot.hmc5883l.update();
      console.log("heading: " + robot.hmc5883l.heading());
    }, 1000);
  })
  .start();
