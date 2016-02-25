# Promise.callback()

```javascript
Promise.callback()
```

return function

## Example
```javascript
var cb = Promise.callback();
fs.readFile('/path/to/someFile', cb);
cb.promise.then(data => {/* ... */})

var cb = Promise.callback();
child_process.exec('someCommand', cb);
cb.promise.spread((stdout, stderr) => /* ... */})
```
