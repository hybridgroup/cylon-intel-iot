# Cylon.js For Intel IoT

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics, physical computing, and the Internet of Things (IoT).

This repository contains the Cylon adaptor for the [Intel Edison](http://www.intel.com/content/www/us/en/do-it-yourself/edison.html) and [Intel Galileo](http://www.intel.com/content/www/us/en/do-it-yourself/galileo-maker-quark-board.html) IoT platforms. It uses the MRAA node module (https://github.com/intel-iot-devkit/mraa) created by the [Intel IoT team](https://github.com/intel-iot-devkit) thank you!

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-intel-iot.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-intel-iot) [![Code Climate](https://codeclimate.com/github/hybridgroup/cylon-intel-iot/badges/gpa.svg)](https://codeclimate.com/github/hybridgroup/cylon-intel-iot) [![Test Coverage](https://codeclimate.com/github/hybridgroup/cylon-intel-iot/badges/coverage.svg)](https://codeclimate.com/github/hybridgroup/cylon-intel-iot)

## How to Install

To install Cylon.js on your Intel Edison, you must be logged into the board, through ssh or the uart serial connection, and execute the following command:

    $ npm install cylon cylon-intel-iot cylon-gpio cylon-i2c mraa

Once `cylon-intel-iot` and friends have been installed, you're ready to start programming!

Please note that you should flash your Intel board with the latest firmware before installing Cylon.js.

## How to Use

### Blinking the built in LED
```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    edison: { adaptor: 'intel-iot' }
  },

  devices: {
    led: { driver: 'led', pin: 13 }
  },

  work: function(my) {
    every((1).second(), my.led.toggle);
  }
}).start();
```

## Setting up your Intel Edison

Everything you need to get started with the Edison is in the Intel Getting Started Guide
located [here](https://communities.intel.com/docs/DOC-23147). Don't forget to
configure your Edison's wifi connection and [flash](https://communities.intel.com/docs/DOC-23192)
your Edison with the latest firmware image (Yocto 3)!

### Updating Node.js on the Intel Edison

The Intel Edison has an older Node.js (0.10.x) installed by default. You can easily update it using [`nvm`](https://github.com/creationix/nvm).

The latest Yocto needs to update the version of the `tar` file decompression utility before you can install new versions of Node.js using `nvm`. You can easily do this as follows. First, add the "unofficial official" package repository, as documented here [http://alextgalileo.altervista.org/edison-package-repo-configuration-instructions.html](http://alextgalileo.altervista.org/edison-package-repo-configuration-instructions.html).

Once you have added the additional package repository, run the following commands:

```
opkg update
opkg install tar
```

You are now ready to install `nvm` on your Edison.

## How to Connect

The [Intel Edison Getting Started Guide](https://communities.intel.com/docs/DOC-23147) details connection instructions for Windows, Mac and Linux.

In order to enable Ethernet over USB on your Edison, follow the appropriate guide for your OS

###### Windows
- Go to control panel -> network and sharing center -> change adaptor settings
- When you plug both usb cables into your computer, you should see a new network device show up
- Right click on the new device and select properties
- Scroll down to IPv4 and select properties
- Select "Use the following IP address"
- Set the IP information to:
	- IP address:           `192.168.2.1`
	- Subnet mask:          `255.255.255.0`
	- Default gateway:      `192.168.2.255`
	- Preferred DNS server: `8.8.8.8`
- Save the changes
- open putty
- ssh to 192.168.2.15
- The user is 'root' and the password is what you configured during the getting started guide

###### OS X
- Install the usb tethering driver http://joshuawise.com/horndis#available_versions
- Open network preferences
- Plug your Edison into your computer
- Find the device `Edison`
- Configure IPv4: Using DHCP with manual address
	- `192.168.2.1`
- Open a terminal
- $ ssh root@192.168.2.15

###### Linux
- Examine your `/etc/network/interfaces` file, if you do not have this line, you must add it and then restart your computer
```
iface usb0 inet dhcp
```
- Plug your Edison into your computer
- $ sudo ifconfig usb0 192.168.2.1 255.255.255.0
- $ ssh root@192.168.2.15

The Edison is now able to use it's wifi connection to reach the internet and your local USB to Ethernet connection for local ssh access and programming. If you have problems reaching the internet, you may need to setup the DNS on your Edison.

Execute the following command on the Edison itself

    # cat "nameserver 8.8.8.8 > /etc/resolv.conf"

If you have a valid wifi connection, you should be able to reach out of your network!

##### Ethernet over USB internet sharing
If you are using ethernet over USB then you can enable internet sharing on your Edison by executing this command on the Edison itself
```bash
/sbin/route add default gw 192.168.2.1
```

Now you're ready to install MRAA and Cylon.

#### Setting up your Intel Galileo

In order to use `cylon-intel-iot` on your Galileo, you need to install the Intel IoT linux boot image onto an sd card.
You can download the latest image [here](https://software.intel.com/sites/landingpage/iotdk/board-boot-image.html).

For Windows hosts you can follow the instruction for flashing your sd card image [here](https://software.intel.com/en-us/node/530353).

For Mac or Linux hosts, it's as easy as extracting the image from the downloaded archive and executing the command

    $ sudo dd if=/path/to/iot-devkit-latest-mmcblkp0.direct of=/dev/sdX bs=1M && sudo sync

where `/dev/sdX` is the location of your sd card. For help determing the location of your sd card, consult the appropriate guide for your OS below.

###### OS X Users

To prepare your SD card for flashing on OS X, you need to find out it's drive name and eject the volume.

To find the name, use the built-in `diskutil` utility:

    $ diskutil list
    /dev/disk0
      #:                       TYPE NAME                    SIZE       IDENTIFIER
      0:      GUID_partition_scheme                        *500.3 GB   disk0
      1:                        EFI EFI                     209.7 MB   disk0s1
      2:                  Apple_HFS Macintosh HD            499.4 GB   disk0s2
      3:                 Apple_Boot Recovery HD             650.0 MB   disk0s3
    /dev/disk1
      #:                       TYPE NAME                    SIZE       IDENTIFIER
      0:     FDisk_partition_scheme                        *15.7 GB    disk1
      1:             Windows_FAT_32 NO NAME                 15.7 GB    disk1s1

According to this, our SD card is found at `/dev/disk1`.

Before you flash it with the above `dd` command, use `diskutil` to eject the existing volume (`disk1s1`):

    $ diskutil unmount /dev/disk1s1

###### Linux Users
To prepare your SD card for flashing on Linux, you need to find the device location of your SD card. An easy way to determin the location is by filtering the `/dev/` directory for new storage devices. Before you plug in your SD card, execute the following `ls` command

    $ ls -l /dev/sd*
    brw-rw---- 1 root disk 8,  0 Sep 16 21:48 /dev/sda
    brw-rw---- 1 root disk 8,  1 Sep 16 21:48 /dev/sda1
    brw-rw---- 1 root disk 8,  2 Sep 16 21:48 /dev/sda2
    brw-rw---- 1 root disk 8,  5 Sep 16 21:48 /dev/sda5


You can see that I only have one storage device `/dev/sda`. Now plug in your SD card and execute the `ls` command again

    $ ls -l /dev/sd*
    brw-rw---- 1 root disk 8,  0 Sep 16 21:48 /dev/sda
    brw-rw---- 1 root disk 8,  1 Sep 16 21:48 /dev/sda1
    brw-rw---- 1 root disk 8,  2 Sep 16 21:48 /dev/sda2
    brw-rw---- 1 root disk 8,  5 Sep 16 21:48 /dev/sda5
    brw-rw---- 1 root disk 8, 16 Sep 17 17:46 /dev/sdb
    brw-rw---- 1 root disk 8, 17 Sep 17 17:46 /dev/sdb1
    brw-rw---- 1 root disk 8, 18 Sep 17 17:46 /dev/sdb2


You can see from this output that I now have a new storage device `/dev/sdb`. That is the location of my SD card, so in this instance the `/dev/sdX` in our `dd` command will be `/dev/sdb`.

After the image has been flashed to your sd card, install the sd card into the Galileo, connect it to your local network and power it up!

Now you're ready to install MRAA and Cylon.

#### Install MRAA
After you have flashed your Intel board and connected it to a network,
you must now install the latest version of the
[Intel MRAA library](https://github.com/intel-iot-devkit/mraa). In order to update MRAA
you simply log into your Intel board, through ssh or the uart serial connection, and follow
the steps [here](https://github.com/intel-iot-devkit/mraa#installing-on-your-board).

### Bluetooth Programming on the Intel Edison featuring Sphero

The Edison includes a bluetooth radio right on the board itself, so it's easy to get started programming bluetooth devices out of the box. First we need to enable bluetooth on the Edison.
 - ssh into your Edison
 - `# rfkill unblock bluetooth`
 - `# bluetoothctl`
    - `[bluetooth]# scan on`
	- Find your Sphero and take note of the MAC address
	- `[bluetooth]# scan off`
	- `[bluetooth]# pair [MAC address of Sphero]`
	- `[bluetooth]# exit`
 - `# rfcomm bind 0 [MAC address of Sphero] 1`
 - This will create a sphero connection bound to `/dev/rfcomm0`
 - `# npm install cylon cylon-intel-iot cylon-sphero`

This example will flash the built in LED whenever the Sphero detects a collision

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    edison: { adaptor: 'intel-iot'},
    sphero: { adaptor: 'sphero', port: '/dev/rfcomm0' }
  },

  devices: {
    led: { driver: 'led', pin: 13, connection: 'edison' },
    sphero: { driver: 'sphero', connection: 'sphero' }
  },

  work: function(my) {
    console.log("Setting up Collision Detection...");
    my.sphero.stop();
    my.sphero.detectCollisions();

    my.sphero.on('collision', function() {
      console.log("Collision");
      my.led.toggle();
    });
  }
}).start();
```

## Documentation

We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing

For our contribution guidelines, please go to [https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
](https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
).

## Release History

For the release history, please go to [https://github.com/hybridgroup/cylon-intel-iot/blob/master/RELEASES.md
](https://github.com/hybridgroup/cylon-intel-iot/blob/master/RELEASES.md
).

## License
Copyright (c) 2013-2016 The Hybrid Group. Licensed under the Apache 2.0 license.
