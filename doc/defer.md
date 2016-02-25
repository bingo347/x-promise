# Promise.defer()

```javascript
Promise.defer()
```

return deferred object with fields **promise**, **resolve**, **reject**<br/>

## Example
```javascript
var deferred = Promise.defer();
fs.readFile('/path/to/someFile', (err, data) => {
    if (err) return deferred.reject(err);
    deferred.resolve(data);
});
deferred.promise.then(/* ... */)
```
