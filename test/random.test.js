/* eslint-env mocha */

'use strict';

var random = require('../lib/random');
var assert = require('chai').assert;

describe('random', function () {
    it('has methods', function () {
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