'use strict';

const cheerio = require('cheerio');
const path = require('path');
const _ = require('lodash');
const Identity = require('fake-identity');
const moment = require('moment');
const faker = require('faker');

const createIdentity = () => {

  const mock = Identity.generate();

  // person
  mock.fullName = `${mock.firstName} ${mock.lastName}`;
  mock.fullNameReverse = `${mock.lastName}, ${mock.firstName}`;
  mock.sexShort = mock.sex.charAt(0).toUpperCase();
  mock.dob = moment(mock.dateOfBirth).format('MM/DD/YYYY');
  mock.memberId = faker.finance.account(9);
  mock.customerId = faker.finance.account(10);
  mock.groupNumber = faker.finance.account(12);

  // address
  mock.addressLine1 = mock.street;
  mock.addressLine2 = `${mock.city} ${mock.state}, ${mock.state} ${mock.zipCode}`;

  // text
  mock.sentence = faker.lorem.sentence();
  mock.sentences = faker.lorem.sentences();
  mock.paragraph = faker.lorem.paragraph();
  mock.paragraphs = faker.lorem.paragraphs();

  // medical
  mock.diagnosisType = faker.finance.account(7);
  mock.procedureCode = faker.finance.account(5);

  return mock;
};

const isHTMLFile = filePath => /\.html|\.htm/.test(path.extname(filePath));

module.exports = () => (files, metalsmith, done) => {

  const data = metalsmith.metadata();
  data.mocks = {};

  setImmediate(done);

  _.each(files, (file, name) => {

    if (!isHTMLFile(file.path || name)) {
      return;
    }

    const contents = file.contents.toString();
    const $ = cheerio.load(contents);

    let mocked = false;

    // get mock targets
    $('[data-mock]').each(function() {

      const $this = $(this);
      let mock = $this.data('mock') || '';

      const targets = mock.split(':');

      if (targets.length === 2) {

        mocked = true;

        const mockType = targets[0];
        const mockIndex = targets[1];

        mock = data.mocks[`_${mockIndex}`] ? data.mocks[`_${mockIndex}`] : createIdentity();
        data.mocks[`_${mockIndex}`] = mock;

        $this.text(mock[mockType]);

      }

    });

    if (mocked) {
      file.contents = new Buffer($.html());
    }

  });
};
