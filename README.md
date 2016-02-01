# x-promise
The library extends the functionality of native promises
*It's not polyfill!*

## Installation
`npm install x-promise`

## Using
In node/browserify/webpack:<br/>
`require('x-promise')`
In browser (without module system):<br/>
copy x-promise.js to your public directory<br/>
```
<!-- optional, for old browsers -->
<script src="//cdn.polyfill.io/v2/polyfill.min.js"></script>

<script src="/path/to/x-promise.js"></script>
```

## Added functionality
- Promise.defer()<br/>
return object with fields **promise**, **resolve**, **reject**<br/>
### Example
```
var deferred = Promise.defer();
fs.readFile('/etc/passwd', (err, data) => {
    if (err) return deferred.reject(err);
    deferred.resolve(data);
});
deferred.promise.then(/* ... */)
```
