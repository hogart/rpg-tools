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
});