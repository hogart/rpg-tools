(function (root, factory) {
    'use strict';
    /* global define, module, require */
    if (typeof define === 'function' && define.amd) { // AMD
        define([], factory);
    } else if (typeof exports === 'object') { // Node, browserify and alike
        module.exports = factory();
    } else { // Browser globals (root is window)
        root.rpgTools = (root.rpgTools || {});
        root.rpgTools.random = factory();
    }
}(this, function () {
    'use strict';

    /**
     * Get random array or object key
     * @param {Array|Object} source
     * @returns {Number|String}
     */
    function getRandomKey (source) {
        if (Array.isArray(source)) {
            return Math.floor(Math.random() * source.length);
        } else {
            var keys = Object.keys(source);
            return keys[getRandomKey(keys)];
        }
    }

    /**
     * Get random value from array or object
     * @param {Array|Object} source
     * @return {Object}
     */
    function getRandomItem (source) {
        var key = getRandomKey(source);
        return source[key];
    }

    var exports = {
        key: getRandomKey,
        item: getRandomItem
    };

    return exports;
}));