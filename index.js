(function (root, factory) {
    'use strict';
    /* global define, module, require */
    if (typeof define === 'function' && define.amd) { // AMD
        define(['./lib/inventory', './lib/modifiers', './lib/ProtoTree', './lib/random', './lib/requirements'], factory);
    } else if (typeof exports === 'object') { // Node, browserify and alike
        module.exports = factory(require('./lib/inventory'), require('./lib/modifiers'), require('./lib/ProtoTree'), require('./lib/random'), require('./lib/requirements'));
    } else { // Browser globals (root is window)
        root.rpgTools = (root.rpgTools || {});
        root.rpgTools = factory(root.rpgTools.inventory, root.rpgTools.modifiers, root.rpgTools.ptp, root.rpgTools.random, root.rpgTools.requirements, root.rpgTools.utils);
    }
}(this, function (inventory, modifiers, ProtoTree, random, requirements) {
    'use strict';

    var exports = {
        inventory: inventory,
        modifiers: modifiers,
        ProtoTree: ProtoTree,
        random: random,
        requirements: requirements
    };

    return exports;
}));