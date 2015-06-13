/* eslint-env mocha */

'use strict';

var assert = require('chai').assert;
var rpgTools = require('../index');

describe('rpgTools', function () {
    it('has desired submodules', function () {
        assert.isFunction(rpgTools.Dice);
        assert.isObject(rpgTools.inventory);
        assert.isObject(rpgTools.modifiers);
        assert.isFunction(rpgTools.ProtoTree);
        assert.isObject(rpgTools.random);
        assert.isObject(rpgTools.requirements);
    });
});
