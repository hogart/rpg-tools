/* eslint-env mocha */

'use strict';

var assert = require('chai').assert;
var utils = require('../lib/utils');

describe('utils', function () {
    it('have methods', function () {
        assert.isFunction(utils.isString);
        assert.isFunction(utils.isNumber);
        assert.isFunction(utils.isObject);
    });

    describe('utils.isString', function () {
        it('properly detects strings', function () {
            assert.ok(utils.isString('wtf'), 'plain string');
            assert.ok(utils.isString(''), 'empty string');
            /*eslint-disable no-new-wrappers, new-cap*/
            assert.ok(utils.isString(new String('ima string')), 'object string');
            assert.ok(utils.isString(String('ima string')), 'object string');
            /*eslint-enable no-new-wrappers, new-cap*/
            assert.notOk(utils.isString(123), 'number');
            assert.notOk(utils.isString(true), 'boolean');
            assert.notOk(utils.isString([]), 'array');
            assert.notOk(utils.isString({}), 'object');
            assert.notOk(utils.isString(utils.isString), 'function');
            assert.notOk(utils.isString(null), 'null');
            assert.notOk(utils.isString(undefined), 'undefined');
        });
    });

    describe('utils.isNumber', function () {
        it('properly detects numbers', function () {
            assert.ok(utils.isNumber(123), 'number');
            assert.ok(utils.isNumber(0), 'number');
            /*eslint-disable no-new-wrappers, new-cap*/
            assert.ok(utils.isNumber(new Number(123)), 'object number');
            assert.ok(utils.isNumber(Number(123)), 'object number');
            /*eslint-enable no-new-wrappers, new-cap*/
            assert.notOk(utils.isNumber('wtf'), 'plain string');
            assert.notOk(utils.isNumber(''), 'empty string');
            assert.notOk(utils.isNumber(String('ima string')), 'plain string');
            assert.notOk(utils.isNumber(true), 'boolean');
            assert.notOk(utils.isNumber([]), 'array');
            assert.notOk(utils.isNumber({}), 'object');
            assert.notOk(utils.isNumber(utils.isNumber), 'function');
            assert.notOk(utils.isNumber(null), 'null');
            assert.notOk(utils.isNumber(undefined), 'undefined');
        });
    });

    describe('utils.isObject', function () {
        it('properly detects objects', function () {
            assert.ok(utils.isObject({}), 'object');
            /*eslint-disable no-new-object*/
            assert.ok(utils.isObject(new Object()), 'object');
            /*eslint-enable no-new-object*/
            assert.notOk(utils.isObject([]), 'array');
            assert.notOk(utils.isObject(123), 'number');
            assert.notOk(utils.isObject(0), 'number');
            assert.notOk(utils.isObject('wtf'), 'plain string');
            assert.notOk(utils.isObject(''), 'empty string');
            assert.notOk(utils.isObject(String('ima string')), 'plain string');
            assert.notOk(utils.isObject(true), 'boolean');
            assert.notOk(utils.isObject(utils.toString), 'function');
            assert.notOk(utils.isObject(null), 'null');
            assert.notOk(utils.isObject(undefined), 'undefined');
        });
    });

    describe('utils.keyPath', function () {
        it('gets value by key', function () {
            var testObj = {
                a: {
                    b: {
                        c: 42
                    }
                }
            };

            assert.equal(utils.keyPath(testObj, 'a.b.c'), 42, 'deeply nested path');
            assert.deepEqual(utils.keyPath(testObj, 'a.b'), {c: 42}, 'less deep');
            assert.isUndefined(utils.keyPath(testObj, 'a.c'), 'incorrect path return undefined');
            assert.deepEqual(utils.keyPath(testObj, 'a'), {b: {c: 42}}, 'direct access works too');
        });

        it('sets value by key', function () {
            var testObj = {
                a: {
                    b: {
                        c: 42
                    }
                }
            };

            assert.changes(
                utils.keyPath.bind(null, testObj, 'a.b.c', 43),
                testObj.a.b,
                'c'
            );

            assert.doesNotChange(
                utils.keyPath.bind(null, testObj, 'a.c', 43),
                testObj.a.b,
                'c',
                'incorrect path does not change'
            );

            assert.changes(
                utils.keyPath.bind(null, testObj, 'a', 'new value'),
                testObj,
                'a',
                'direct access works too'
            );
        });
    });

    describe('utils.clone', function () {
        it('returns copy of object', function () {
            var src = {
                a: 42
            };
            var dest = utils.clone(src);
            assert.deepEqual(src, dest, 'deeply equal objects');
            assert.notEqual(src, dest, 'but different ones');
        });
    });
});