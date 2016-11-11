'use strict';

/* global describe, it */

const chai = require('chai');

const metalsmith = require('metalsmith');
const metalsmithMock = require('../lib');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const expect = chai.expect;

describe('metalsmith-mock', () => {

  it('should create mock data', done => {

    const metal = metalsmith(path.join(__dirname, 'fixtures'));

    metal
      .use(metalsmithMock())
      .build(err => {

        if (err) {
          return done(err);
        }

        const contents = fs.readFileSync(path.join(__dirname, 'fixtures/build/index.html'), 'utf8');
        const $ = cheerio.load(contents);

        const mocks = $('[data-mock]');

        const actual0 = $(mocks[0]).text();
        const actual1 = $(mocks[1]).text();

        expect(metal.metadata().mocks._1.memberId).to.be.equal(actual0);
        expect(metal.metadata().mocks._1.customerId).to.be.equal(actual1);

        done();
      });

  });

});
