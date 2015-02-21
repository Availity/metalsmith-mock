# metalsmith-mock

> Generate mock data for Metalsmith HTML templates

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://img.shields.io/david/Availity/availity-cli.svg)](https://david-dm.org/Availity/metalsmith-mock)



## Quickstart

+ Install **metalsmith-mock** with npm

>
``` bash
  npm install metalsmith-mock --save-dev
```

+ Add `data-mock` attributes to html

>
``` html
<span data-mock="memberId:1"></span>
<span data-mock="customerId:1"></span>
```

+ Add `metalsmith-mock` plugin to metalsmith

>
``` js
var metalsmith = require('metlasmith');
var metalsmithMock = require('metalsmith-mock');
metalsmith(__dirname)
  .use(metalsmithMock())
  .build();
```

## Output

>
``` html
<span data-mock="memberId:1">981479716</span>
<span data-mock="customerId:1">6564503975</span>
```

## API

``` js
data-mock="mock:identityKey"
```

**metalsmith-mock** now only allows for the dynamic creation of mock data but also the reuse of the mock data identities throughout html templates.  

When **metelsmith-mock** first encounters a `data-mock` attribute, it checks to see if that mock identity key has been previously defined, and if so, uses that mock identify throughout all metalsmith templates.  

If the mock identify key hasn't been previously defined, a new identify is created and cached in `metal.metadata().mocks[identityKey` object.

## Mock Options

+ fullName 
+ fullNameReverse 
+ sexShort 
+ dob 
+ memberId 
+ customerId 
+ groupNumber 
+ addressLine1 
+ addressLine2
+ sentence 
+ sentences 
+ paragraph 
+ diagnosisType 
+ procedureCode 

## Authors

**Robert McGuinness**
+ [rob.mcguinness@availity.com](rob.mcguinness@availity.com)

## Disclaimer

Open source software components distributed or made available in the Availity Materials are licensed to Company under the terms of the applicable open source license agreements, which may be found in text files included in the Availity Materials.

## Copyright and license

Code and documentation copyright 2015 Availity, LLC. Code released under [the MIT license](https://github.com/Availity/metalsmith-mock/blob/master/LICENSE).


