'use strict';

var _ = require('lodash');
var shortUrlModel = require('./shorturl.model');
var hash = require('short-id');
var request = require('superagent');
var localConfig;
try {
  localConfig = require('../../config/local.env');
} catch (e) {
  localConfig = {};
}
var DOMAIN = localConfig.DOMAIN || 'gdgroups.org';

hash.configure({
  length: 6,
  algorithm: 'sha1',
  salt: Math.random
});

// Get list of shortUrls
exports.index = function(req, res) {
  shortUrlModel.find(function (err, shorturls) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, shorturls);
  });
};

// Get a single shortUrl
exports.show = function(req, res) {
  shortUrlModel.findOne({ $or:[ {'hash': req.params.id }, {'event_id': req.params.id } ]}, function (err, shortUrl) {
    if (err) {
      return handleError(res, err);
    }

    if (!shortUrl) {
      request.get('https://hub.gdgx.io/api/v1/events/' + req.params.id, function(err, hubRes) {
        if (err || !hubRes || !hubRes.body || !hubRes.body._id) {
          // If there is an error looking up the shortUrl, just redirect to default prefix.
          res.redirect(301, 'http://' + DOMAIN);
        }

        shortUrlModel.create({
          event_id: hubRes.body._id,
          chapter_id: hubRes.body.chapter,
          hash: hash.store(hubRes.body._id + hubRes.body.chapter)
        }, function(err, shortUrl) {
          if (err) {
            console.error(err);
            return res.send(500, 'Unable to create new shortUrl entry.');
          }

          res.jsonp(shortUrl);
        });
      });

    } else {
      return res.jsonp(shortUrl);
    }
  });
};

// Creates a new shortUrl in the DB.
exports.create = function(req, res) {
  shortUrlModel.create(req.body, function(err, shortUrl) {
    if (err) { return handleError(res, err); }
    return res.json(201, shortUrl);
  });
};

// Updates an existing shortUrl in the DB.
exports.update = function(req, res) {
  if (req.body._id) { delete req.body._id; }
  shortUrlModel.findById(req.params.id, function (err, shortUrl) {
    if (err) { return handleError(res, err); }
    if (!shortUrl) { return res.send(404); }
    var updated = _.merge(shortUrl, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, shortUrl);
    });
  });
};

// Deletes a shortUrl from the DB.
exports.destroy = function(req, res) {
  shortUrlModel.findById(req.params.id, function (err, shortUrl) {
    if (err) { return handleError(res, err); }
    if (!shortUrl) { return res.send(404); }
    shortUrl.remove(function(err) {
      if (err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

/**
 * @param res
 * @param err
 * @returns {*}
 */
function handleError(res, err) {
  return res.send(500, err);
}
