/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var request = require('superagent');
var ShortUrl = require('./api/shorturl/shorturl.model');
var hash = require('short-id');
var geoip = require("geoip-native");

module.exports = function(app) {

  hash.configure({
    length: 6,
    algorithm: 'sha1',
    salt: Math.random
  });

  app.use("/api/shorturl", require('./api/shorturl'));

  app.route('/:hash/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/:hash')
    .get(function(req, res) {
      ShortUrl.findOne({ $or:[ {'hash': req.params.hash }, {'event_id': req.params.hash } ]}, function(err, shortUrl) {
        var me = this;

        var recordHit = function(req, shortUrl) {
          var geoIp = geoip.lookup(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
          var userAgent = require('ua-parser').parse(req.headers['user-agent']);
          var referer = req.headers['referer'] || "Unknown";

          shortUrl.hits++;

          var platFound = false;
          for(var i = 0; i < shortUrl.platforms.length; i++) {
            var platform = shortUrl.platforms[i];

            if(platform.name == userAgent.os.family) {
              platform.hits++;
              platFound = true;
            }
          }
          if(!platFound) {
            shortUrl.platforms.push({
              name: userAgent.os.family,
              hits: 1
            })
          }

          var browserFound = false;
          for(var i = 0; i < shortUrl.browsers.length; i++) {
            var browser = shortUrl.browsers[i];

            if(browser.name == userAgent.ua.family) {
              browser.hits++;
              browserFound = true;
            }
          }
          if(!browserFound) {
            shortUrl.browsers.push({
              name: userAgent.ua.family,
              hits: 1
            })
          }

          var countryFound = false;
          for(var i = 0; i < shortUrl.countries.length; i++) {
            var country = shortUrl.countries[i];

            if(country.name == geoIp.name) {
              country.hits++;
              countryFound = true;
            }
          }
          if(!countryFound) {
            shortUrl.countries.push({
              name: geoIp.name || "Unknown",
              hits: 1
            })
          }

          var referrerFound = false;
          for(var i = 0; i < shortUrl.referrers.length; i++) {
            var referrer = shortUrl.referrers[i];

            if(referrer.name == referer) {
              referrer.hits++;
              referrerFound = true;
            }
          }
          if(!referrerFound) {
            shortUrl.referrers.push({
              name: referer,
              hits: 1
            })
          }

          shortUrl.save();
        };

        var redirect = function(req, shortUrl) {

          if(shortUrl.event_id) {
            res.redirect(301, "https://gdg.events/"+shortUrl.event_id+"/");
          } else {
            res.redirect(301, shortUrl.url);
          }

          var func = recordHit.bind(me, req, shortUrl);
          process.nextTick(func);
        };

        if(!shortUrl) {
          request.get('https://hub.gdgx.io/api/v1/events/'+req.params.hash, function(err, eventsRes) {
            if(err || !eventsRes.body._id)
              return res.send(404,"Not found.");

            ShortUrl.create({
              event_id: eventsRes.body._id,
              chapter_id: eventsRes.body.chapter,
              hash: hash.store(eventsRes.body._id+eventsRes.body.chapter)
            }, function(err, shortUrl) {
              if(err) {
                console.error(err);
                return res.send(500, "Uh oh.");
              }

              redirect(req, shortUrl);
            });
          });
        } else {
          redirect(req, shortUrl);
        }
      });

    });
};
