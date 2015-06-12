/* eslint-env mocha */

'use strict';

var ProtoTree = require('../lib/ProtoTree');
var assert = require('chai').assert;
var weaponTree = {
    '@weapon': {
        name: '-- Weapon --',
        description: 'If you see this, please contact developers.',
        type: 'weapon',
        icon: 'generic-weapon'
    },

    '@sword': {
        proto: '@weapon',
        name: '-- Sword --',
        slot: 'rightHand',
        icon: 'generic-sword'
    },

    falchion: {
        proto: '@sword',
        name: 'Falchion',
        description: 'Falchion have one-sided blade.',
        requirements: {
            'class': 'warrior'
        },
        ar: 10
    },

    twoHandedSword: {
        proto: '@sword',
        isTwoHanded: true,
        name: 'Two-handed sword',
        description: 'Very long and heavy sword',
        requirements: {
            'class': 'warrior'
        },
        ar: 15
    },

    flamberg: {
        proto: 'twoHandedSword',
        name: 'Flamberg',
        description: 'Flamberg is so-called flaming sword, with wavy blade.',
        requirements: {
            'class': 'warrior'
        },
        ar: 20
    },

    espada: {
        proto: '@sword',
        name: 'Espada',
        description: 'Espada',
        requirements: {
            'class': 'scout'
        },
        ar: 10,
        icon: 'generic-espada'
    },

    rapier: {
        proto: 'espada',
        name: 'Rapier',
        description: 'Rapier.',
        requirements: {
            'class': 'scout'
        },
        ar: 15,
        icon: 'rapier'
    },

    gladius: {
        proto: '@sword',
        name: 'Gladius',
        description: 'Short sword, lightweight and handy in close quarters.',
        requirements: {
            'class': 'bard'
        },
        ar: 10
    },

    invalid: {
        name: 'Error',
        proto: '@error'
    }
};

describe('ProtoTree', function () {
    var protoTree;
    beforeEach(function () {
        protoTree = new ProtoTree(weaponTree);
    });

    it('has `get` method', function () {
        assert.isFunction(protoTree.get);
    });

    it('returns items by name', function () {
        var falchion = protoTree.get('falchion');

        assert.equal(falchion.name, 'Falchion');
        assert.equal(falchion.description, 'Falchion have one-sided blade.');
        assert.equal(falchion.ar, 10);
        assert.equal(falchion.slot, 'rightHand');
        assert.equal(falchion.icon, 'generic-sword');
        assert.equal(falchion.type, 'weapon');
        assert.deepEqual(falchion.requirements, {class: 'warrior'});

        assert.notProperty(falchion, 'proto deleted');

        var rapier = protoTree.get('rapier');
        assert.deepEqual(rapier, {
            name: 'Rapier',
            description: 'Rapier.',
            requirements: {
                class: 'scout'
            },
            ar: 15,
            icon: 'rapier',
            type: 'weapon',
            slot: 'rightHand'
        }, '3 level inheritance successful');

        assert.notProperty(falchion, 'proto', 'proto deleted');
    });

    it('throws error when non-existent item is requested', function () {
        assert.throws(
            protoTree.get.bind(protoTree, 'wtf'),
            /No such object in given tree as wtf/,
            'correct exception on incorrect name'
        );
    });

    it('throws error when item with invalid proto requested', function () {
        assert.throws(
            protoTree.get.bind(protoTree, 'invalid'),
            /Invalid proto specified for Error/,
            'correct exception on invalid item'
        );
    });
});