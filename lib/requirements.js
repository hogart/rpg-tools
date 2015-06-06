(function (root, factory) {
    'use strict';
    /* global define, module, require */
    if (typeof define === 'function' && define.amd) { // AMD
        define(['./utils'], factory);
    } else if (typeof exports === 'object') { // Node, browserify and alike
        module.exports = factory(require('./utils'));
    } else { // Browser globals (root is window)
        root.rpgTools = (root.rpgTools || {});
        root.rpgTools.requirements = factory(root.rpgTools.utils);
    }
}(this, function (utils) {
    'use strict';

    /**
     * Does the wearer met this requirements?
     * @param {Object} wearer
     * @param {Object} requirements Each field could be one of following: a) array of possible values, b) object with `min` and/or `max` properties (either numerical or string) or c) primitive value. Missing property means fail.
     * @returns {Boolean}
     */
     function met (wearer, requirements) {
        if (!requirements) {
            return true;
        }

        if (!utils.isObject(wearer)) {
            throw new TypeError('Invalid wearer');
        }

        var met = true;
        var requirementNames = Object.keys(requirements);
        var reqName;
        var req;

        if (!requirementNames.length) { // fast return, empty requirements mean "anything goes"
            return true;
        }

        for (var i = 0; i < requirementNames.length; i++) {
            reqName = requirementNames[i];
            req = requirements[reqName];

            if (wearer[reqName] === undefined) {
                met = false;
                break;
            }

            if (Array.isArray(req)) { // wearer[reqName] should belong to set
                if (req.indexOf(wearer[reqName]) === -1) {
                    met = false;
                    break;
                }
            } else if (utils.isObject(req)) { // wearer[reqName] should be greater than min and/or less than max
                if (req.min && req.min > wearer[reqName]) {
                    met = false;
                    break;
                }

                if (req.max && req.max < wearer[reqName]) {
                    met = false;
                    break;
                }
            } else { // wearer[reqName] should be exactly equal
                if (req !== wearer[reqName]) {
                    met = false;
                    break;
                }
            }
        }

        return met;
    }

    var exports = {
        met: met
    };

    return exports;
}));