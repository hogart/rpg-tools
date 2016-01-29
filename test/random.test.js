/* eslint-env mocha */
/* global describe, it */

'use strict';

var assert = require('chai').assert;
var random = require('../lib/random');

describe('random', function () {
    it('has methods', function () {
        assert.isFunction(random.int);
        assert.isFunction(random.key);
        assert.isFunction(random.item);
    });

    var obj = {
        24: true,
        12: true,
        365: true
    };
    var arr = Object.keys(obj);
    var values = arr.map(function (key) {
        return obj[key];
    });

    describe('random.int', function () {
        it('returns integer numbers in proper range', function () {
            var rand;
            for (var i = 0; i < 20; i++) {
                rand = random.int(5, 10);
                assert.equal(rand, Math.round(rand));
                assert.isBelow(rand, 10);
                assert.isAbove(rand, 4);
            }
        });

        it('defaults to 0 if one argument is omitted', function () {
            var rand;
            for (var i = 0; i < 20; i++) {
                rand = random.int(5);
                assert.isBelow(rand, 5);
                assert.isAbove(rand, -1);
            }
        });
    });

    describe('random.sign', function () {
        it('returns only -1 or 1, no other number', function () {
            var hadPlus = false;
            var hadMinus = false;
            var sign;
            for (var i = 0; i < 20; i++) {
                sign = random.sign();
                assert.include([-1, 1], sign);
                if (sign > 0) {
                    hadPlus = true;
                } else if (sign < 0) {
                    hadMinus = true;
                }
            }

            assert.ok(hadMinus, 'there were some minuses');
            assert.ok(hadPlus, 'but some pluses also');
        });
    });

    describe('random.key', function () {
        it('works with arrays', function () {
            for (var i = 0; i < 9; i++) {
                assert.include([0, 1, 2], random.key(arr));
            }
        });

        it('works with objects', function () {
            for (var i = 0; i < 9; i++) {
                assert.include(arr, random.key(obj));
            }
        });
    });

    describe('random.item', function () {
        it('works with arrays', function () {
            for (var i = 0; i < 9; i++) {
                assert.include(arr, random.item(arr));
            }
        });

        it('works with objects', function () {
            for (var i = 0; i < 9; i++) {
                assert.include(values, random.item(obj));
            }
        });
    });
});