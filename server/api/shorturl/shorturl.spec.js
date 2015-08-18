'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/shorturl', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/shorturl')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.body.should.be.instanceOf(Array);
        done();
      });
  });
});
