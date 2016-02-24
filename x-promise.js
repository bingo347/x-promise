;(function(f){typeof Promise==='function'&&f(Promise)}(function(P){
    'use strict';
    var pp = P.prototype;
    Object.defineProperty(P, '@XPromiseVersion', {
        configurable : true,
        writable : false,
        enumerable : false,
        value : '1.1.0'
    });

    function defMethod(target, name, func) {
        if(typeof target[name] === 'function') return;
        Object.defineProperty(target, name, {
            configurable : true,
            writable : false,
            enumerable : false,
            value : func
        });
    }

    /**
     * Promise.props
     * @param (Object) obj
     * @return (Promise)
     */
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

    /**
     * Promise.defer
     * @return (Object) defered object
     *
     * Defered {
     *  (Promise) promise
     *  (function(value)) resolve
     *  (function((Error) error)) reject
     * }
     */
    defMethod(P, 'defer', function defer() {
        var d = {};
        d.promise = new P(function(resolve, reject) {
            d.resolve = resolve;
            d.reject = reject;
        });
        return d;
    });

    /**
     * Promise.callback
     * @return (function((Error) error), ...values)) cb
     * (Promise) cb.promise
     */
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

    /**
     * Promise.attempt
     * @param (function()) func
     * @return (Promise)
     */
    defMethod(P, 'attempt', function attempt(func) {
        return this.resolve().then(func);
    });

    /**
     * Promise.delay
     * @param (int) t time in milliseconds
     * @return (Promise)
     */
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

    /**
     * Promise.prototype.delay
     * @param (int) t time in milliseconds
     * @return (Promise)
     */
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

    /**
     * Promise.prototype.spread
     * @param (function(...values)) func
     * @return (Promise)
     */
    defMethod(pp, 'spread', function spread(func) {
        return this.then(function(value) {
            return func.apply(this, value);
        });
    });

    /**
     * Promise.prototype.tap
     * @param (function(value)) func
     * @return (Promise)
     */
    defMethod(pp, 'tap', function tap(func) {
        return this.then(function(value) {
            func.call(this, value)
            return value;
        });
    });

    /**
     * Promise.prototype.delay
     * @param (int) t time in milliseconds
     * @param !optional (Error|string) err
     * @return (Promise)
     */
    defMethod(pp, 'timeout', function timeout(t, err) {
        return P.race([
            this,
            P.delay(t).then(function() {
                if(err instanceof Error) {
                    throw err;
                }
                if(typeof err === 'string') {
                    throw new Error(err);
                }
                throw new Error('Promise timeout');
            })
        ]);
    });

    /**
     * Promise.prototype.map
     * @param (function(value, index, array)) func
     * @return (Promise)
     */
    defMethod(pp, 'map', function map(func) {
        return this.then(function(value) {
            return P.all(
                Array.prototype.map.call(value, func)
            );
        });
    });
}));
