/* eslint-env mocha */

'use strict';

var assert = require('chai').assert;
var modifiers = require('../lib/modifiers');

describe('modifiers', function () {
    describe('apply', function () {
        it('properly adds/substracts number', function () {
            assert.equal(modifiers.apply(4, 2), 6, 'added number ok');
            assert.equal(modifiers.apply(4, -2), 2, 'substracted number ok');
        });

        it('properly works with percents', function () {
            assert.equal(modifiers.apply(10, '100%'), 20, 'plus, when sign is ommited');
            assert.equal(modifiers.apply(10, '-100%'), 0, 'susbtracts percents correctly');
            assert.equal(modifiers.apply(10, '-15%'), 8.5, 'added percents correctly');
            assert.equal(modifiers.apply(10, '+16%'), 11.6, 'explicit "+" is fine too');
        });
    });
});
