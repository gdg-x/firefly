'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'gdgroups.org',
  SESSION_SECRET: 'INSERT_YOUR_SERVER_OAUTH_SECRET_HERE',
  GOOGLE_API_KEY: 'INSET_YOUR_API_KEY_HERE',
  MONGO_URI: 'mongodb://localhost/firefly-dev',
  // Server IP
  SERVER_IP: '127.0.0.1',
  // Server port
  PORT: 9000,
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
