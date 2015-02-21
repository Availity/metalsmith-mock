/* global describe, it */

var chai = require('chai');
var metalsmith = require('metalsmith');
var metalsmithMock = require('../lib');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var expect = chai.expect;

describe('metalsmith-mock', function() {

  it('should create mock data', function(done){

    var metal = metalsmith(path.join(__dirname, 'fixtures'));

    metal
      .use(metalsmithMock())
      .build(function(err){

        if(err) {
          return done(err);
        }

        var contents = fs.readFileSync(path.join(__dirname, 'fixtures/build/index.html'), "utf8");
        var $ = cheerio.load(contents);

        var mocks = $('[data-mock]');

        var actual0 = $(mocks[0]).text();
        var actual1 = $(mocks[1]).text();

        expect(metal.metadata().mocks['_1'].memberId).to.be.equal(actual0);
        expect(metal.metadata().mocks['_1'].customerId).to.be.equal(actual1);

        done();
      });

  });

});
