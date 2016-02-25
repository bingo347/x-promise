# Promise.props()

```javascript
Promise.props(dictionary)
```

It's like Promise.all, but work with dictionary

## Example
```javascript
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
