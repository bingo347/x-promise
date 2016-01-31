;(function(f){typeof Promise==='function'&&f(Promise)}(function(P){
    'use strict';
    var pp = P.prototype;
    var gopn = Object.getOwnPropertyNames;

    function defMethod(target, name, func) {
        if(typeof target[name] === 'function') return;
        Object.defineProperty(target, name, {
            configurable : true,
            writable : false,
            enumerable : false,
            value : func
        });
    }

    defMethod(P, 'props', function props(obj) {
        var keys = gopn(obj);
        var i, len = i = keys.length;
        var arr = new Array(len);
        while(--i + 1) {
            arr[i] = obj[keys[i]];
        }
        return this.all(arr).then(function(rArr) {
            var result = {};
            var i = len;
            while(--i + 1) {
                result[keys[i]] = rArr[i];
            }
            return result;
        });
    });
}));
