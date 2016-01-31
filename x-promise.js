;(function(f){typeof Promise==='function'&&f(Promise)}(function(P){
    'use strict';
    var pp = P.prototype;

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
        var keys = Object.getOwnPropertyNames(obj);
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

    defMethod(P, 'defer', function defer() {
        var d = {};
        d.promise = new P(function(resolve, reject) {
            d.resolve = resolve;
            d.reject = reject;
        });
        return d;
    });

    defMethod(P, 'callback', function callback() {
        var d = this.defer();
        var cb = function(err, a1, a2, a3) {
            if(err) {
                return d.reject(err);
            }
            var len = arguments.length;
            switch(len) {
                case 0:
                case 1:
                    d.resolve();
                    break;
                case 2:
                    d.resolve(a1);
                    break;
                case 3:
                    d.resolve([a1, a2]);
                    break;
                case 4:
                    d.resolve([a1, a2, a3]);
                    break;
                default:
                    var args = new Array(len - 1);
                    while(--len) {
                        args[len - 1] = arguments[len]
                    }
                    d.resolve(args)
            }
        };
        cb.promise = d.promise;
        return cb;
    });

    defMethod(P, 'attempt', function attempt(func) {
        return this.resolve().then(func);
    });

    defMethod(P, 'delay', function delay(t) {
        return new P(function(resolve) {
            var _t = parseInt(t);
            if(typeof t !== 'number' && _t !== _t) {
                if(typeof setImmediate === 'function') {
                    setImmediate(resolve);
                    return;
                }
                setTimeout(resolve, 0)
                return;
            }
            setTimeout(resolve, _t);
        });
    });

    defMethod(pp, 'delay', function delay(t) {
        return this.then(function(value) {
            return new P(function(resolve) {
                var _t = parseInt(t);
                if(typeof t !== 'number' && _t !== _t) {
                    if(typeof setImmediate === 'function') {
                        setImmediate(resolve, value);
                        return;
                    }
                    setTimeout(resolve, 0, value)
                    return;
                }
                setTimeout(resolve, _t, value);
            });
        });
    });
}));
