
var cashe = {};
module.exports = function(OtherPromise) {
    var casheKey = String(OtherPromise);
    if(casheKey in cashe) return cashe[casheKey];
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
    cashe[casheKey] = XPromise;
    return XPromise;
}
