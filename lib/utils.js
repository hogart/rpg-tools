(function (root, factory) {
    'use strict';
    /* global define, module, require */
    if (typeof define === 'function' && define.amd) { // AMD
        define([], factory);
    } else if (typeof exports === 'object') { // Node, browserify and alike
        module.exports = factory();
    } else { // Browser globals (root is window)
        root.rpgToolsUtils = factory();
    }
}(this, function () {
    'use strict';

    /**
     *
     * @namespace
     */
    var utils = {};

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

    utils.isString = isString;
    utils.isNumber = isNumber;
    utils.isObject = isObject;

    return utils;
}));
