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
    console.info('ok: props');
});

;(()=> {
    var cb = Promise.callback();
    cb(null, true);
    return cb.promise;
})().then(r => {
    assert.equal(r, true, 'callback #1');
    console.info('ok: callback #1');
});
;(()=> {
    var cb = Promise.callback();
    cb(null, 1, 2, 3, 4, 5, 6, 7);
    return cb.promise;
})().then(r => {
    assert.deepEqual(r, [1, 2, 3, 4, 5, 6, 7], 'callback #2');
    console.info('ok: callback #2');
});
;(()=> {
    var cb = Promise.callback();
    cb(new Error(''));
    return cb.promise;
})().then(r => {
    console.error('callback #3: not rejected!');
}).catch(r => {
    assert.equal(r instanceof Error, true, 'callback #3');
    console.info('ok: callback #3');
});

Promise.all([1, 2, 3]).spread((a, b, c) => {
    assert.equal(a, 1, 'spread');
    assert.equal(b, 2, 'spread');
    assert.equal(c, 3, 'spread');
    console.info('ok: spread');
});

Promise
    .resolve({a : 1})
    .tap(obj => obj.a++)
    .then(obj => {
        assert.equal(obj.a, 2, 'tap');
        console.info('ok: tap');
    });

console.info('ok');
