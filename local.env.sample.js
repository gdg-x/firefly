'use strict';

// Use local.env.js for environment variables that grunt will set when the server is built.
// Use for your api keys, secrets, etc. The local.env.js file with your settings should not be tracked by git.
//
// You will need to set these to the production values and build with grunt before deploying to production.

module.exports = {
  DOMAIN: 'localhost',
  // Hub Server
  HUB_IP: 'https://hub.gdgx.io/',
  GOOGLE_API_KEY: 'YOUR-KEY-HERE'
};
