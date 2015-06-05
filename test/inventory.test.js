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

    describe('uneqip', function () {
        it('removes item from given slot and pushes it to inventory', function () {
            var helmet = {
                slot: 'head'
            };

            var attributes = {
                equipped: {
                    head: helmet
                },
                inventory: []
            };

            inventory.unEquip(attributes, 'head');

            assert.lengthOf(attributes.inventory, 1);
            assert.equal(attributes.inventory[0], helmet);
            assert.isNull(attributes.equipped.head);

            assert.throws(
                inventory.unEquip.bind(null, attributes, 'non-existent slot name'),
                /No such slot: non-existent slot name/,
                'throws exception when non-existent slot'
            );
        });
    });
});