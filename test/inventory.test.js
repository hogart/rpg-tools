/* eslint-env mocha */

'use strict';

var inventory = require('../lib/inventory');
var assert = require('chai').assert;

describe('inventory', function () {
    it('have desired methods', function () {
		assert.isFunction(inventory.unEquip);
		assert.isFunction(inventory.equipFromInventory);
		assert.isFunction(inventory.isWearable);
    });

    describe('unEqip', function () {
        var helmet = {
            slot: 'head'
        };

        var attributes = {
            equipped: {
                head: helmet,
                emptySlot: null
            },
            inventory: []
        };

        it('removes item from given slot and pushes it to inventory', function () {
            inventory.unEquip(attributes, 'head');

            assert.lengthOf(attributes.inventory, 1);
            assert.equal(attributes.inventory[0], helmet);
            assert.isNull(attributes.equipped.head);
        });

        it('does not changes anything when working with empty slot', function () {
            var inventoryLength = attributes.inventory.length;

            inventory.unEquip(attributes, 'emptySlot');

            assert.lengthOf(attributes.inventory, inventoryLength);
            assert.isNull(attributes.equipped.emptySlot);
        });

        it('throws specific error with incorrect slot', function () {
            assert.throws(
                inventory.unEquip.bind(null, attributes, 'non-existent slot name'),
                /No such slot: non-existent slot name/,
                'throws exception when non-existent slot'
            );
        });
    });
});