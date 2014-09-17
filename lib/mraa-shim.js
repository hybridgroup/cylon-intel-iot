if (process.env['TEST_MODE'] == 'true') {
  module.exports = require('../test/support/mraa-mock');
} else {
  module.exports = require('mraa');
}
