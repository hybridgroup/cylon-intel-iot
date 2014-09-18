# Cylon.js For Intel IoT

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and
physical computing using Node.js

This repository contains the Cylon adaptor for the [Intel Edison](http://www.intel.com/content/www/us/en/do-it-yourself/edison.html) and [Intel Galileo](http://www.intel.com/content/www/us/en/do-it-yourself/galileo-maker-quark-board.html) IoT platforms. It uses the MRAA node module (https://github.com/intel-iot-devkit/mraa) created by the [Intel IoT team](https://github.com/intel-iot-devkit) thank you!

This module currently supports the folloing Intel IoT hardware: 
- Intel Galileo Gen 1
- Intel Galileo Gen 2
- Intel Edison with the Arduino breakout board

For more information about Cylon.js, check out the repo at
https://github.com/hybridgroup/cylon

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-intel-iot.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-intel-iot)

## Getting Started

#### Setting up your Intel Edison

Everything you need to get started with the Edison is in the Intel Getting Started Guide
located [here](https://communities.intel.com/docs/DOC-23147). Don't forget to
configure your Edison's wifi connection and [flash](https://communities.intel.com/docs/DOC-23192)
your Edison with the latest firmware image! 

Now you're ready to install MRAA and Cylon.

#### Setting up your Intel Galileo

In order to use `cylon-intel-iot` on your Galileo, you need to install the Intel IoT linux boot image onto an sd card. You can download the latest image [here](https://software.intel.com/sites/landingpage/iotdk/board-boot-image.html). 

For Windows hosts you can follow the instruction for flashing your sd card image [here](https://software.intel.com/en-us/node/530353). 

For Mac or Linux hosts, it's as easy as extracting the image from the downloaded archive and executing the command 

    $ sudo dd if=iot-devkit-latest-mmcblkp0.direct of=/dev/sdX bs=1M && sudo sync 

where `/dev/sdX` is the location of your sd card.

After the image has been flashed to your sd card, install the sd card into the Galileo, connect it to your local network and power it up!

Now you're ready to install MRAA and Cylon.

#### Install MRAA
After you have flashed your Intel board and connected it to a network,
you must now install the latest version of the 
[Intel MRAA library](https://github.com/intel-iot-devkit/mraa). In order to update MRAA
you simply log into your Intel board, through ssh or the uart serial connection, and follow 
the steps [here](https://github.com/intel-iot-devkit/mraa#installing-on-your-board).

#### Install Cylon

Once you have flashed your Intel board with the latest firmware as well as updated MRAA, 
you will now install `cylon-intel-iot`. To do this you must be
logged into the board, through ssh or the uart serial connection, and execute the
following command 
    
    $ npm install -g cylon-intel-iot

Once `cylon-intel-iot` has been installed , you're ready to start programming!

## Examples

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'edison', adaptor: 'intel-iot' },
  device: {name: 'led', driver: 'led', pin: 13 },

  work: function(my) {
    every((1).second(), function() {
      my.led.toggle();
    });
  }
}).start();
```

## Contributing

* All patches must be provided under the Apache 2.0 License
* Please use the -s option in git to "sign off" that the commit is your work and you are providing it under the Apache 2.0 License
* Submit a Github Pull Request to the appropriate branch and ideally discuss the changes with us in IRC.
* We will look at the patch, test it out, and give you feedback.
* Avoid doing minor whitespace changes, renamings, etc. along with merged content. These will be done by the maintainers from time to time but they can complicate merges and should be done seperately.
* Take care to maintain the existing coding style.
* Add unit tests for any new or changed functionality & lint and test your code using `make test` and `make lint`.
* All pull requests should be "fast forward"
  * If there are commits after yours use “git rebase -i <new_head_branch>”
    * If you have local changes you may need to use “git stash”
      * For git help see [progit](http://git-scm.com/book) which is an awesome (and free) book on git

## Release History

Version 0.1.0 - Initial release

## License
Copyright (c) 2013-2014 The Hybrid Group. Licensed under the Apache 2.0 license.
