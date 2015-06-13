(function (root, factory) {
    'use strict';
    /* global define, module, require */

    var modules = ['Dice', 'inventory', 'modifiers', 'ProtoTree', 'random', 'requirements'];
    var paths = modules.map(function (module) { return './lib/' + module; });

    if (typeof define === 'function' && define.amd) { // AMD
        define(paths, factory);
    } else if (typeof exports === 'object') { // Node, browserify and alike
        module.exports = factory.apply(null, paths.map(function (path) { return require(path); }));
    } else { // Browser globals (root is window)
        root.rpgTools = (root.rpgTools || {});
        root.rpgTools = factory.apply(null, modules.map(function (module) { return root.rpgTools[module]; }));
    }
}(this, function (Dice, inventory, modifiers, ProtoTree, random, requirements) {
    'use strict';

    var exports = {
        Dice: Dice,
        inventory: inventory,
        modifiers: modifiers,
        ProtoTree: ProtoTree,
        random: random,
        requirements: requirements
    };

    return exports;
}));