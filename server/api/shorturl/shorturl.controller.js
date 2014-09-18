'use strict';

var _ = require('lodash');
var Shorturl = require('./shorturl.model');
var hash = require('short-id');
var request = require('superagent');

hash.configure({
  length: 6,
  algorithm: 'sha1',
  salt: Math.random
});

// Get list of shorturls
exports.index = function(req, res) {
  Shorturl.find(function (err, shorturls) {
    if(err) { return handleError(res, err); }
    return res.json(200, shorturls);
  });
};

// Get a single shorturl
exports.show = function(req, res) {
  var me = this;
  Shorturl.findOne({ $or:[ {'hash': req.params.id }, {'event_id': req.params.id } ]}, function (err, shorturl) {
    if(err) { return handleError(res, err); }
    if(!shorturl) {
      
      request.get('https://hub.gdgx.io/api/v1/events/'+req.params.id, function(err, hubRes) {
        if(err || !hubRes.body._id)
          return res.send(404,"Not found.");

        Shorturl.create({
          event_id: hubRes.body._id,
          chapter_id: hubRes.body.chapter,
          hash: hash.store(hubRes.body._id+hubRes.body.chapter)
        }, function(err, shortUrl) {
          if(err) {
            console.error(err);
            return res.send(500, "Uh oh.");
          }

          res.jsonp(shortUrl);
        });
      });

    } else {
      return res.jsonp(shorturl);
    }
  });
};

// Creates a new shorturl in the DB.
exports.create = function(req, res) {
  Shorturl.create(req.body, function(err, shorturl) {
    if(err) { return handleError(res, err); }
    return res.json(201, shorturl);
  });
};

// Updates an existing shorturl in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Shorturl.findById(req.params.id, function (err, shorturl) {
    if (err) { return handleError(res, err); }
    if(!shorturl) { return res.send(404); }
    var updated = _.merge(shorturl, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, shorturl);
    });
  });
};

// Deletes a shorturl from the DB.
exports.destroy = function(req, res) {
  Shorturl.findById(req.params.id, function (err, shorturl) {
    if(err) { return handleError(res, err); }
    if(!shorturl) { return res.send(404); }
    shorturl.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}