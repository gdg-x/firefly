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
  ip:       localConfig.SERVER_IP ||
            process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     localConfig.PORT ||
            process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri:    localConfig.MONGO_URI ||
            process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
            'mongodb://localhost/firefly'
  }
};
