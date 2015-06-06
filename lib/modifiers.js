(function (root, factory) {
    'use strict';
    /* global define, module, require */
    if (typeof define === 'function' && define.amd) { // AMD
        define(['./utils'], factory);
    } else if (typeof exports === 'object') { // Node, browserify and alike
        module.exports = factory(require('./utils'));
    } else { // Browser globals (root is window)
        root.rpgTools = (root.rpgTools || {});
        root.rpgTools.modifiers = factory(root.rpgTools.utils);
    }
}(this, function (utils) {
    'use strict';

    var percentRe = /([+\-]?)(\d+)%/;

    /**
     * Parses and applies modifiers to given value
     * @param {Number} num basic value
     * @param {String|Number} modifier e.g. '+15%' or -4
     * @returns {Number}
     */
    function apply (num, modifier) {
        if (!modifier) { // if modifier is non-existent
            return num;
        }

        if (utils.isString(modifier)) {
            var parts = modifier.match(percentRe); // e.g. '-15%'
            var quotient = Number(parts[1] + parts[2]) / 100; // Number('-' + '15')
            num += num * quotient;
        } else if (utils.isNumber(modifier)) {
            num += modifier;
        }

        return num;
    }

    var exports = {
        apply: apply
    };

    return exports;
}));