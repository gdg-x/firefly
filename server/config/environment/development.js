'use strict';

// Development specific configuration
// ==================================
var localConfig;
try {
  localConfig = require('../local.env');
} catch (e) {
  localConfig = {};
}

module.exports = {
  // Server IP
  ip: localConfig.SERVER_IP || '127.0.0.1',
  // Server port
  port: localConfig.PORT || 9000,
  // MongoDB connection options
  mongo: {
    uri: localConfig.MONGO_URI ||
         'mongodb://localhost/firefly-dev'
  },
  seedDB: true
};
