/* eslint-env mocha */

'use strict';

var inventory = require('../lib/inventory');
var assert = require('chai').assert;

var helmet = {
    slot: 'head'
};
var heavyHelmet = {
    slot: 'head',
    name: 'heavy helmet',
    requirements: {
        str: { min: 10 }
    }
};
var lightHelmet = {
    slot: 'head',
    name: 'light helmet',
    requirements: {
        str: { min: 0 }
    }
};

describe('inventory', function () {
    it('have desired methods', function () {
		assert.isFunction(inventory.unEquip);
		assert.isFunction(inventory.equipFromInventory);
		assert.isFunction(inventory.isWearable);
    });

    describe('unEqip', function () {
        var unEquip = inventory.unEquip;
        var attributes = {
            equipped: {
                head: helmet,
                emptySlot: null
            },
            inventory: []
        };

        it('returns same object it was given', function () {
            var newAttribs = unEquip(attributes, 'emptySlot');
            assert.ok(newAttribs === attributes, 'same object');
        });

        it('removes item from given slot and pushes it to inventory', function () {
            unEquip(attributes, 'head');

            assert.lengthOf(attributes.inventory, 1);
            assert.equal(attributes.inventory[0], helmet);
            assert.isNull(attributes.equipped.head);
        });

        it('does not changes anything when working with empty slot', function () {
            var inventoryLength = attributes.inventory.length;

            unEquip(attributes, 'emptySlot');

            assert.lengthOf(attributes.inventory, inventoryLength);
            assert.isNull(attributes.equipped.emptySlot);
        });

        it('throws specific error with incorrect slot', function () {
            assert.throws(
                unEquip.bind(null, attributes, 'non-existent slot name'),
                /No such slot: non-existent slot name/,
                'throws exception when non-existent slot'
            );
        });
    });

    describe('equipFromInventory', function () {
        var equip = inventory.equipFromInventory;

        it('returns same object it was given', function () {
            var attributes = {
                equipped: {
                    head: null,
                    emptySlot: null
                },
                inventory: [helmet]
            };
            var newAttribs = equip(attributes, 0, 'head');

            assert.ok(newAttribs === attributes, 'same object');
        });

        it('removes item from inventory and places it to correct slot', function () {
            var attributes = {
                equipped: {
                    head: null,
                    emptySlot: null
                },
                inventory: [helmet]
            };

            equip(attributes, 0, 'head');

            assert.lengthOf(attributes.inventory, 0);
            assert.equal(attributes.equipped.head, helmet);
        });

        it('throws error on invalid index and does not change inventory and equipped', function () {
            var attributes = {
                equipped: {
                    head: null,
                    emptySlot: null
                },
                inventory: [helmet]
            };

            assert.throws(
                equip.bind(null, attributes, 1, 'head'),
                /Invalid inventory index: 1/,
                'no such index thrown'
            );

            assert.deepEqual(attributes.equipped, {head: null, emptySlot: null});
            assert.deepEqual(attributes.inventory, [helmet]);
        });
        
        it('throws error on invalid slotName and does not change inventory and equipped', function () {
            var badItem = {
                slot: 'wtf slot', name: 'wtf'
            };
            var attributes = {
                equipped: {
                    head: null,
                    emptySlot: null
                },
                inventory: [helmet, badItem]
            };

            assert.throws(
                equip.bind(null, attributes, 0, 'invalid slot'),
                /No such slot: invalid slot/,
                'no such slot thrown'
            );

            assert.deepEqual(attributes.equipped, {head: null, emptySlot: null});
            assert.deepEqual(attributes.inventory, [helmet, badItem]);

            assert.throws(
                equip.bind(null, attributes, 1),
                /No such slot: wtf slot/,
                'no such slot thrown when slot was auto-selected'
            );

            assert.deepEqual(attributes.equipped, {head: null, emptySlot: null});
            assert.deepEqual(attributes.inventory, [helmet, badItem]);
        });
        
        it('throws error when item.slot and slotName mismatch', function () {
            var attributes = {
                equipped: {
                    head: null,
                    feet: null
                },
                inventory: [helmet]
            };

            assert.throws(
                equip.bind(null, attributes, 0, 'feet'),
                /Item intended for head and can not be equipped to feet/,
                'slot mismatch thrown'
            );

            assert.deepEqual(attributes.equipped, {head: null, feet: null});
            assert.deepEqual(attributes.inventory, [helmet]);
        });

        it('throws error when item requirements not met and vice versa', function () {
            var attributes = {
                str: 1,
                equipped: {
                    head: null
                },
                inventory: [heavyHelmet, lightHelmet]
            };

            assert.throws(
                equip.bind(null, attributes, 0),
                /Item requirements not met/,
                'requirements exception thrown'
            );

            assert.deepEqual(attributes.equipped, {head: null});
            assert.deepEqual(attributes.inventory, [heavyHelmet, lightHelmet]);

            assert.doesNotThrow(
                equip.bind(null, attributes, 1),
                /Item requirements not met/,
                'requirements exception NOT thrown'
            );

            assert.deepEqual(attributes.equipped, {head: lightHelmet});
            assert.deepEqual(attributes.inventory, [heavyHelmet]);
        });

        it('unequips item if slot is occupied', function () {
            var attributes = {
                str: 15,
                equipped: {
                    head: lightHelmet
                },
                inventory: [heavyHelmet]
            };

            equip(attributes, 0);
            assert.deepEqual(attributes.equipped, {head: heavyHelmet});
            assert.deepEqual(attributes.inventory, [lightHelmet]);
        })
    });

    describe('isWearable', function () {
        var isWearable = inventory.isWearable;

        it('throws error on invalid index and does not change inventory and equipped', function () {
            var attributes = {
                equipped: {
                    head: null,
                    emptySlot: null
                },
                inventory: [helmet]
            };

            assert.throws(
                isWearable.bind(null, attributes, 1),
                /Invalid inventory index: 1/,
                'no such index thrown'
            );
        });

        it('throws error when item requirements not met', function () {
            var attributes = {
                str: 1,
                equipped: {
                    head: null
                },
                inventory: [heavyHelmet, lightHelmet]
            };

            assert.throws(
                isWearable.bind(null, attributes, 0),
                /Item requirements not met/,
                'requirements exception thrown'
            );
        });

        it('throws error when item.slot and slotName mismatch', function () {
            var attributes = {
                equipped: {
                    head: null,
                    feet: null
                },
                inventory: [{name: 'slotless thing'}]
            };

            assert.throws(
                isWearable.bind(null, attributes, 0),
                /Item "slotless thing" can not be equipped/,
                'slot mismatch thrown'
            );
        });
        
        it('returns string with destined slot', function () {
            var attributes = {
                equipped: {
                    head: null
                },
                inventory: [helmet]
            };

            var result = isWearable(attributes, 0);
            assert.equal('head', result);
        })
    });
});