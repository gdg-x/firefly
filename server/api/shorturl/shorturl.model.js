'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShortUrlSchema = new Schema({
  hash       : { type : String, unique: true },
  url        : { type : String, unique: true, sparse: true },
  event_id   : { type : String, unique: true, sparse: true },
  chapter_id : { type : String },
  hits       : { type : Number, default: 0 },
  platforms  : [{
    name      : { type : String },
    hits     : { type : Number, default: 0 }
  }],
  referrers  : [{
    name      : { type : String },
    hits     : { type : Number, default: 0 }
  }],
  browsers  : [{
    name      : { type : String },
    hits     : { type : Number, default: 0 }
  }],
  countries  : [{
    name      : { type : String },
    hits     : { type : Number, default: 0 }
  }]
});

ShortUrlSchema.index({_id: 1, 'platforms.name': 1}, {unique: true});
ShortUrlSchema.index({_id: 1, 'referrers.name': 1}, {unique: true});
ShortUrlSchema.index({_id: 1, 'browsers.name': 1}, {unique: true});
ShortUrlSchema.index({_id: 1, 'countries.name': 1}, {unique: true});

module.exports = mongoose.model('ShortUrl', ShortUrlSchema);
