/* eslint-env mocha */

'use strict';

var assert = require('chai').assert;
var modifiers = require('../lib/modifiers');

describe('modifiers', function () {
    describe('apply', function () {
        var applyMod = modifiers.apply;

        it('does not change passed variable', function () {
            var obj = {
                prop: 12
            };

            assert.doesNotChange(
                applyMod.bind(null, obj.prop),
                obj,
                'prop',
                'not changing when modifier is missing'
            );

            assert.doesNotChange(
                applyMod.bind(null, obj.prop, 12),
                obj,
                'prop',
                'not changing when modifier is missing'
            );
        });

        it('if modifier is falsy, return number as is', function () {
            assert.equal(applyMod(12, 0), 12, '0 ok');
            assert.equal(applyMod(12, null), 12, 'null ok');
            assert.equal(applyMod(12, undefined), 12, 'undefined ok');
            assert.equal(applyMod(12, ''), 12, 'empty string ok');
            assert.equal(applyMod(12, NaN), 12, 'NaN ok');
        });

        it('properly adds/substracts number', function () {
            assert.equal(applyMod(4, 2), 6, 'added number ok');
            assert.equal(applyMod(4, -2), 2, 'substracted number ok');
        });

        it('properly works with percents', function () {
            assert.equal(applyMod(10, '100%'), 20, 'plus, when sign is ommited');
            assert.equal(applyMod(10, '-100%'), 0, 'susbtracts percents correctly');
            assert.equal(applyMod(10, '-15%'), 8.5, 'added percents correctly');
            assert.equal(applyMod(10, '+16%'), 11.6, 'explicit "+" is fine too');
        });
    });

    describe('applyObject', function () {
        var applyObj = modifiers.applyObject;

        it('applies modifiers in object form', function () {
            var src = {
                str: 12,
                dex: 10,
                vitals: {
                    hp: 10
                }
            };
            var awkwardShieldOfStrength = {
                str: '50%',
                dex: '-10%',
                'vitals.hp': '+10%'
            };
            var shieldOfHealth = {
                hp: '+25%'
            };
            var result = applyObj(src, awkwardShieldOfStrength);

            assert.deepEqual({str: 18, dex: 9, vitals: {hp: 11}}, result, 'resulting object looks as expected');

            var result2 = applyObj(src, shieldOfHealth);
            assert.deepEqual(result2, src, 'when property is missing, it does not change original object');
        });

        it('treats third argument correctly', function () {
            var src = {
                str: 12,
                dex: 10
            };
            var awkwardShieldOfStrength = {
                str: '50%',
                dex: '-10%'
            };
            var result = applyObj(src, awkwardShieldOfStrength);

            assert.notEqual(src, result, 'and source object is intact');

            var result2 = applyObj(src, awkwardShieldOfStrength, true);
            assert.equal(src, result2, 'source object changed when called with 3rd arg true');
        });
    });
});
