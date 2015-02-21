# metalsmith-mock

> Generate mock data for Metalsmith HTML templates

## Usage

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
