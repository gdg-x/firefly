'use strict';

/**
 * Main application routes
 */
var errors = require('./components/errors');
var request = require('superagent');
var shortUrlModel = require('./api/shorturl/shorturl.model');
var hash = require('short-id');
var geoip = require('devintent-geoip-native');
var localConfig;
try {
  localConfig = require('./config/local.env');
} catch (e) {
  localConfig = {};
}

module.exports = function(app) {
  var DOMAIN = localConfig.DOMAIN || 'gdgroups.org';
  var HUB_IP = localConfig.HUB_IP || 'https://hub.gdgx.io/';

  hash.configure({
    length: 6,
    algorithm: 'sha1',
    salt: Math.random
  });

  //noinspection JSCheckFunctionSignatures
  app.use('/api/shorturl', require('./api/shorturl'));

  app.route('/:hash/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html', null, null);
    });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/:hash')
    .get(function(req, res) {
      shortUrlModel.findOne({ $or:[ {'hash': req.params.hash }, {'event_id': req.params.hash } ]},
        function(err, shortUrl) {
        var me = this;

        function handleTagsResponse(err, tagsRes) {
          if (err || !tagsRes || !tagsRes.body || !tagsRes.body._id) {
            console.error(err);
            // If there is an error looking up the shortUrl, just redirect to default prefix.
            return res.redirect(301, 'http://' + DOMAIN);
          }
          redirect(me, req, res, 'http://' + DOMAIN + '/' + tagsRes.body._id + '/events');
        }
        /**
         * @param err
         * @param eventsRes
         * @returns {*}
         */
        function handleEventsResponse(err, eventsRes) {
          if (err || !eventsRes || !eventsRes.body || !eventsRes.body._id) {
            if (err && err.status == 404) {
              request.get(HUB_IP + 'api/v1/tags/' + req.params.hash, handleTagsResponse);
            } else {
              console.error(err);
              // If there is an error looking up the shortUrl, just redirect to default prefix.
              return res.redirect(301, 'http://' + DOMAIN);
            }
          }

          // Create a new DB entry for this new event shortUrl
          shortUrlModel.create({
            event_id: eventsRes.body._id,
            chapter_id: eventsRes.body.chapter,
            hash: hash.store(eventsRes.body._id + eventsRes.body.chapter)
          }, function(err, newShortUrl) {
            if (err) {
              console.error(err);
              return res.send(500, 'Unable to create new shortUrl entry.');
            } else {
              redirect(me, req, res, newShortUrl);
            }
          });
        }

        if (!shortUrl) {
          request.get(HUB_IP + 'api/v1/events/' + req.params.hash, handleEventsResponse);
        } else {
          redirect(me, req, res, shortUrl);
        }
      });
    });

  /**
   * @param me
   * @param req
   * @param res
   * @param shortUrl
   */
  function redirect(me, req, res, shortUrl) {
    if (shortUrl.event_id) {
      res.redirect(301, 'http://' + DOMAIN + '/event/' + shortUrl.event_id + '/');
    } else {
      res.redirect(301, shortUrl.url);
    }

    var func = recordHit.bind(me, req, shortUrl);
    process.nextTick(func);
  }

  /**
   * @param req
   * @param shortUrl
   */
  function recordHit(req, shortUrl) {
    var geoIp = geoip.lookup(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    var userAgent = require('ua-parser').parse(req.headers['user-agent']);
    var referrer = req.headers.referrer || 'Unknown';
    var i, j, k, l;

    shortUrl.hits++;

    var platFound = false;
    for (i = 0; i < shortUrl.platforms.length; i++) {
      var platform = shortUrl.platforms[i];

      if (platform.name === userAgent.os.family) {
        platform.hits++;
        platFound = true;
      }
    }
    if (!platFound) {
      shortUrl.platforms.push({
        name: userAgent.os.family,
        hits: 1
      })
    }

    var browserFound = false;
    for (j = 0; j < shortUrl.browsers.length; j++) {
      var browser = shortUrl.browsers[j];

      if (browser.name === userAgent.ua.family) {
        browser.hits++;
        browserFound = true;
      }
    }
    if (!browserFound) {
      shortUrl.browsers.push({
        name: userAgent.ua.family,
        hits: 1
      })
    }

    var countryFound = false;
    for (k = 0; k < shortUrl.countries.length; k++) {
      var country = shortUrl.countries[k];

      if (country.name === geoIp.name) {
        country.hits++;
        countryFound = true;
      }
    }
    if (!countryFound) {
      shortUrl.countries.push({
        name: geoIp.name || 'Unknown',
        hits: 1
      })
    }

    var referrerFound = false;
    for (l = 0; l < shortUrl.referrers.length; l++) {
      var shortReferrer = shortUrl.referrers[l];

      if (shortReferrer.name === referrer) {
        shortReferrer.hits++;
        referrerFound = true;
      }
    }
    if (!referrerFound) {
      shortUrl.referrers.push({
        name: referrer,
        hits: 1
      })
    }

    shortUrl.save();
  }
};
