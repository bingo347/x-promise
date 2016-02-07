'use strict';
var xpModule = require('fs').readFileSync(require('path').join(__dirname, 'x-promise.js'), 'utf8');
if(xpModule.charCodeAt(0) === 0xFEFF) {
    xpModule = xpModule.slice(1);
}
xpModule = new Function('Promise', xpModule);
module.exports = function(OtherPromise) {
    var TargetPromise = OtherPromise || global.Promise;
    function XPromise() {
        TargetPromise.apply(this, arguments);
    }
    XPromise.prototype = Object.create(TargetPromise.prototype);
    XPromise.prototype.constructor = XPromise;
    Object.getOwnPropertyNames(TargetPromise).forEach(function(prop) {
        if(typeof TargetPromise[prop] !== 'function') return;
        Object.defineProperty(XPromise, prop, {
            configurable : true,
            writable : false,
            enumerable : false,
            value : TargetPromise[prop]
        });
    });
    xpModule(XPromise);
    return XPromise;
}
