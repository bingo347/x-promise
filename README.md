# x-promise
The library extends the functionality of native promises
<br><i>It's not polyfill!</i><br>ES5 compatible

## Installation
`npm install x-promise`

## Using
In node/browserify/webpack:
```javascript
require('x-promise')
```
No-conflict version, for use in other libraries (works only in node.js)
```javascript
const XPromise = require('x-promise/no-conflict')();
//or with any polyfill
const XMyPromise = require('x-promise/no-conflict')(MyPromise);
```
In browser (without module system):<br/>
copy x-promise.min.js to your public directory
```html
<!-- optional, for old browsers -->
<script src="//cdn.polyfill.io/v2/polyfill.min.js"></script>

<script src="/path/to/x-promise.min.js"></script>
```

## Added functionality
* [Promise.defer()](https://github.com/bingo347/x-promise/wiki/Promise.defer())
* [Promise.callback()](https://github.com/bingo347/x-promise/wiki/Promise.callback())
* [Promise.props(dictionary)](https://github.com/bingo347/x-promise/wiki/Promise.props())
* [Promise.attempt(function())](https://github.com/bingo347/x-promise/wiki/Promise.attempt())
* [Promise.delay([milliseconds])](https://github.com/bingo347/x-promise/wiki/.delay())
* [promiseInstanse.delay([milliseconds])](https://github.com/bingo347/x-promise/wiki/.delay())
* [promiseInstanse.timeout(milliseconds[, errorInstanse | (string) message])](https://github.com/bingo347/x-promise/wiki/.timeout())
* [promiseInstanse.spread(function(...values))](https://github.com/bingo347/x-promise/wiki/.spread())
* [promiseInstanse.tap(function(value))](https://github.com/bingo347/x-promise/wiki/.tap())
* [Promise.map(array, function(value, index, array))](https://github.com/bingo347/x-promise/wiki/.map())
* [promiseInstanse.map(function(value, index, array))](https://github.com/bingo347/x-promise/wiki/.map())
* [promiseInstanse.reduce(function(previousValue, currentValue, index, array)[, initialValue])](https://github.com/bingo347/x-promise/wiki/.reduce())
