/*
Lifecycle events.

When running on Google App Engine Managed VMs, the application will receive
start, stop, and health check requests. [Read more](https://cloud.google.com/appengine/docs/managed-vms/custom-runtimes#lifecycle_events)

If running on Compute Engine, the HTTP load balancer can also take advantage of the health
check. [Read more](https://cloud.google.com/compute/docs/load-balancing/health-checks).
*/

'use strict';

var express = require('express');

var router = express.Router();

// [START health_checks]
router.get('/_ah/health', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.status(200).send('ok');
});
// [END health_checks]

router.get('/_ah/start', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.status(200).send('ok');
});

router.get('/_ah/stop', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.status(200).send('ok');
  process.exit();
});

module.exports = router;
