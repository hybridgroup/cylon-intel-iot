var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'edison', adaptor: 'intel-iot' },

  devices: [
    { name: 'led', driver: 'led', pin: 13 },
    { name: 'button', driver: 'button', pin: 2 }
  ],

  work: function(my) {
    my.button.on('push', my.led.toggle);
  }
}).start();
