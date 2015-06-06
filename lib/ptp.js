(function (root, factory) {
    'use strict';
    /* global define, module, require */
    if (typeof define === 'function' && define.amd) { // AMD
        define(['./utils'], factory);
    } else if (typeof exports === 'object') { // Node, browserify and alike
        module.exports = factory(require('./utils'));
    } else { // Browser globals (root is window)
        root.rpgTools = (root.rpgTools || {});
        root.rpgTools.ptp = factory(root.rpgTools.utils);
    }
}(this, function (utils) {
    'use strict';

    var exports = {};

    function deepDefaults (obj, defaults) {
        Object.keys(defaults).forEach(function (key) {
            if (utils.isObject(defaults[key])) {
                if (obj[key] === undefined) {
                    obj[key] = {};
                }

                obj[key] = deepDefaults(obj[key], defaults[key]);
            } else if (Array.isArray(defaults[key])) {
                if (obj[key] === undefined) {
                    obj[key] = [];
                }

                obj[key] = deepDefaults(obj[key], defaults[key]);
            } else if (obj[key] === undefined) {
                obj[key] = defaults[key];
            }
        });

        return obj;
    }

    function derive (obj, tree) {
        var proto = tree[obj.proto];
        if (!proto) {
            throw new TypeError('Invalid proto specified for ' + obj.name);
        }
        obj.proto = proto.proto;

        return deepDefaults(obj, proto);
    }

    /**
     * Implements [Prototype pattern]{@link http://gameprogrammingpatterns.com/prototype.html#prototypes-for-data-modeling}.
     * @param {String} name of needed object
     * @param {Object} tree Tree of inherited objects
     * @returns {Object}
     */
    exports.getPrototypedItem = function (name, tree) {
        var item = tree[name];

        if (!item) {
            throw new RangeError('No such object in given tree as ' + name);
        }

        while (('proto' in item) && item.proto) {
            item = derive(item, tree);
        }

        // should be undefined or otherwise falsy, so we don't need it anyway
        delete item.proto;

        return item;
    };

    return exports;
}));