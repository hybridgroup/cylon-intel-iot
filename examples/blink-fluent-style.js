var cylon = require('cylon');

cylon.robot({
  connection: { name: 'edison', adaptor: 'intel-iot' },
  device: {name: 'led', driver: 'led', pin: 13 },
})

.on('ready', function(my) {
    setInterval(function() {
      my.led.toggle();
    }, 1000);
  }
)

.start();
