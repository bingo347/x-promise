'use strict';function xpModule(Promise){(function(f){typeof Promise==="function"&&f(Promise)})(function(P){"use strict";var pp=P.prototype;function defMethod(target,name,func){if(typeof target[name]==="function")return;Object.defineProperty(target,name,{configurable:true,writable:false,enumerable:false,value:func})}defMethod(P,"@XPromiseVersion","1.2.0");defMethod(P,"props",function props(obj){var keys=Object.getOwnPropertyNames(obj);var i,len=i=keys.length;var arr=new Array(len);while(i--){arr[i]=obj[keys[i]]}return this.all(arr).then(function(rArr){var result={};var i=len;while(i--){result[keys[i]]=rArr[i]}return result})});defMethod(P,"defer",function defer(){var d={};d.promise=new P(function(resolve,reject){d.resolve=resolve;d.reject=reject});return d});defMethod(P,"callback",function callback(){var d=this.defer();var cb=function(err,a1,a2,a3){if(err){return d.reject(err)}var len=arguments.length;switch(len){case 0:case 1:d.resolve();break;case 2:d.resolve(a1);break;case 3:d.resolve([a1,a2]);break;case 4:d.resolve([a1,a2,a3]);break;default:var args=new Array(len-1);while(--len){args[len-1]=arguments[len]}d.resolve(args)}};cb.promise=d.promise;return cb});defMethod(P,"attempt",function attempt(func){return this.resolve().then(func)});defMethod(P,"delay",function delay(t){return new P(function(resolve){var _t=parseInt(t);if(typeof t!=="number"&&_t!==_t){if(typeof setImmediate==="function"){setImmediate(resolve);return}setTimeout(resolve,0);return}setTimeout(resolve,_t)})});defMethod(pp,"delay",function delay(t){return this.then(function(value){return new P(function(resolve){var _t=parseInt(t);if(typeof t!=="number"&&_t!==_t){if(typeof setImmediate==="function"){setImmediate(resolve,value);return}setTimeout(resolve,0,value);return}setTimeout(resolve,_t,value)})})});defMethod(pp,"spread",function spread(func){return this.then(function(value){return func.apply(this,value)})});defMethod(pp,"tap",function tap(func){return this.then(function(value){func.call(this,value);return value})});defMethod(pp,"timeout",function timeout(t,err){return P.race([this,P.delay(t).then(function(){if(err instanceof Error){throw err}if(typeof err==="string"){throw new Error(err)}throw new Error("Promise timeout")})])});defMethod(pp,"map",function map(func){return this.then(function(value){return P.all(Array.prototype.slice.call(value))}).then(function(value){return P.all(value.map(func))})});defMethod(P,"map",function map(arr,func){return this.resolve(arr).map(func)});defMethod(pp,"reduce",function reduce(func,initialValue){var args=new Array(arguments.length);for(var i=arguments.length;i--;)args[i]=arguments[i];return this.then(function(value){return Array.prototype.reduce.apply(value,args)})});defMethod(P,"fnwrap",function fnwrap(func){return function(){var self=this;var args=new Array(arguments.length+2);for(var i=arguments.length;i--;)args[i+2]=arguments[i];return new P(function(resolve,reject){args[0]=resolve;args[1]=reject;func.apply(self,args)})}});defMethod(P,"coroutine",function coroutine(func){function run(resolve,reject,generator,action,arg){try{var iter=generator[action](arg)}catch(error){return reject(error)}var value=P.resolve(iter.value);if(iter.done){return value.then(resolve,reject)}value.then(function(value){run(resolve,reject,generator,"next",value)},function(error){run(resolve,reject,generator,"throw",error)})}return function(){var self=this;var args=new Array(arguments.length);for(var i=arguments.length;i--;)args[i]=arguments[i];return P.attempt(function(){return func.apply(self,args)}).then(function(generator){if(!generator||typeof generator.next!=="function"||typeof generator.throw!=="function"){return generator}return new P(function(resolve,reject){run(resolve,reject,generator,"next")})})}})});}

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
