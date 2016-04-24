'use strict';

// Production specific configuration
// =================================
var localConfig;
try {
  localConfig = require('../local.env');
} catch (e) {
  localConfig = {};
}

module.exports = {
  // Server IP
  ip:       process.env.IP ||
            localConfig.SERVER_IP ||
            undefined,

  // Server port
  port:     localConfig.PORT ||
            process.env.PORT ||
            9000,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGO_URI ||
            localConfig.MONGO_URI ||
            'mongodb://localhost/firefly'
  }
};
