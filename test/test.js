'use strict';
require('..');
const assert = require('assert');

Promise.props({
    a : Promise.resolve(1),
    b : Promise.resolve(2),
    c : Promise.resolve(3)
}).then(r => {
    assert.deepEqual(r, {
        a : 1,
        b : 2,
        c : 3
    }, 'props');
});

;(_ => {
    var cb = Promise.callback();
    cb(null, true);
    return cb.promise;
})().then(r => {
    assert.equal(r, true, 'callback #1');
});
;(_ => {
    var cb = Promise.callback();
    cb(null, 1, 2, 3, 4, 5, 6, 7);
    return cb.promise;
})().then(r => {
    assert.deepEqual(r, [1, 2, 3, 4, 5, 6, 7], 'callback #2');
});
;(_ => {
    var cb = Promise.callback();
    cb(new Error(''));
    return cb.promise;
})().then(r => {
    console.error('callback #3: not rejected!');
}).catch(r => {
    assert.equal(r instanceof Error, true, 'callback #3');
});

console.log('ok');
