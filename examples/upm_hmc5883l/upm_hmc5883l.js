var Cylon = require('cylon');

Cylon.robot({
  connection: {name: 'edison', adaptor: 'intel-iot'},
  device: {name: 'hmc5883l', driver: 'upm-hmc5883l'},

  work: function(my) {
    every((1).second(), function() {
      my.hmc5883l.update();
      console.log("heading: " + my.hmc5883l.heading());
    });
  }
}).start();
