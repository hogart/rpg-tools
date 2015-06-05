/* eslint-env mocha */

'use strict';

var utils = require('../lib/utils');
var assert = require('chai').assert;

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
});