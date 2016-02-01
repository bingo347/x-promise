# x-promise
The library extends the functionality of native promises
*It's not polyfill!*

## Installation
`npm install x-promise`

## Using
In node/browserify/webpack:<br/>
`require('x-promise')`<br/>
In browser (without module system):<br/>
copy x-promise.js to your public directory<br/>
```
<!-- optional, for old browsers -->
<script src="//cdn.polyfill.io/v2/polyfill.min.js"></script>

<script src="/path/to/x-promise.js"></script>
```

## Added functionality
- Promise.defer()<br/>
return deferred object with fields **promise**, **resolve**, **reject**<br/>
```
var deferred = Promise.defer();
fs.readFile('/path/to/someFile', (err, data) => {
    if (err) return deferred.reject(err);
    deferred.resolve(data);
});
deferred.promise.then(/* ... */)
```

- Promise.callback()<br/>
return function<br/>
```
var cb = Promise.callback();
fs.readFile('/path/to/someFile', cb);
cb.promise.then(data => {/* ... */})

var cb = Promise.callback();
child_process.exec('someCommand', cb);
cb.promise.spread((stdout, stderr) => /* ... */})
```

- Promise.props(dictionary)<br/>
like Promise.all, but work with dictionary<br/>
```
Promise.props({
    a : Promise.resolve(1),
    b : Promise.resolve(2),
    c : Promise.resolve(3)
}).then(result => {
    console.log(result.a); // 1
    console.log(result.b); // 2
    console.log(result.c); // 3
})
```

- Promise.attempt(function())<br/>
It's short alias for Promise.resolve().then<br/>
```
Promise.attempt(() => {/* ... */})
```

- Promise.delay([milliseconds])<br/>
promiseInstanse.delay([milliseconds])<br/>
setTimeout and setImmediate wrapped in Promise
```
somePromise.then(result => {
    /* ... */
    return 1;
}).delay(100).then(result => {
    console.log(result); // 1
})
```

- promiseInstanse.timeout(milliseconds[, errorInstanse | (string) message])<br/>
It's wrap promiseInstanse, promise will be rejected if promiseInstanse is not resolved or rejected within milliseconds<br/>
```
somePromise.timeout(500).then(result => {
    /* ... */
}).catch(error => {
    /* ... */
})
```
