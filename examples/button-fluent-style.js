var cylon = require('cylon');

cylon.robot({
  connection: { name: 'edison', adaptor: 'intel-iot' },

  devices: [
    { name: 'led', driver: 'led', pin: 13 },
    { name: 'button', driver: 'button', pin: 2 }
  ]
})

.on('ready', function(my) {
  my.button.on('push', function() {
    my.led.toggle();
  });
})

.start();
