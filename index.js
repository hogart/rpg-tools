(function (root, factory) {
    'use strict';
    /* global define, module, require */
    if (typeof define === 'function' && define.amd) { // AMD
        define(['./lib/inventory', './lib/modifiers', './lib/ptp', './lib/random', './lib/requirements', './lib/utils'], factory);
    } else if (typeof exports === 'object') { // Node, browserify and alike
        module.exports = factory(require('./lib/inventory'), require('./lib/modifiers'), require('./lib/ptp'), require('./lib/random'), require('./lib/requirements'), require('./lib/utils'));
    } else { // Browser globals (root is window)
        root.rpgTools = (root.rpgTools || {});
        root.rpgTools = factory(root.rpgTools.inventory, root.rpgTools.modifiers, root.rpgTools.ptp, root.rpgTools.random, root.rpgTools.requirements, root.rpgTools.utils);
    }
}(this, function (inventory, modifiers, ptp, random, requirements, utils) {
    'use strict';

    var exports = {
        inventory: inventory,
        modifiers: modifiers,
        ptp: ptp,
        random: random,
        requirements: requirements
    };

    return exports;
}));