(function (root, factory) {
    'use strict';
    /* global define, module, require */
    if (typeof define === 'function' && define.amd) { // AMD
        define([], factory);
    } else if (typeof exports === 'object') { // Node, browserify and alike
        module.exports = factory();
    } else { // Browser globals (root is window)
        root.rpgTools = (root.rpgTools || {});
        root.rpgTools.utils = factory();
    }
}(this, function () {
    'use strict';

    var toString = Object.prototype.toString;

    function isString (value) {
        return toString.call(value) === '[object String]';
    }

    function isNumber (value) {
        return toString.call(value) === '[object Number]';
    }

    function isObject (value) {
        var type = typeof value;
        return !Array.isArray(value) && (type === 'object' && !!value);
    }

    var exports = {
        isString: isString,
        isNumber: isNumber,
        isObject: isObject
    };

    return exports;
}));
