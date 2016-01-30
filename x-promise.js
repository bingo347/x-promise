;(function(f){typeof Promise==='function'&&f(Promise)}(function(P){
    'use strict';
    var pp = P.prototype;

    function defMethod(target, name, func) {
        Object.defineProperty(target, name, {
            configurable : true,
            writable : false,
            enumerable : false,
            value : func
        });
    }

    
}));
