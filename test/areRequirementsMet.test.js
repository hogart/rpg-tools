/* eslint-env mocha */

'use strict';

var areRequirementsMet = require('../index').areRequirementsMet;
var assert = require('chai').assert;

describe('areRequirementsMet', function () {
    it('is a function', function () {
        assert.isFunction(areRequirementsMet, 'is a function');
    });

    it('returns true if requirements are missing', function () {
        assert.ok(areRequirementsMet({}, undefined), 'undefined is ok');
        assert.ok(areRequirementsMet({}, null), 'null is ok');
        assert.ok(areRequirementsMet({}, {}), 'empty object is ok');
    });

    it('properly works with list requirements', function () {
        var list = {
            race: ['dwarf', 'human']
        };

        var worthy1 = {
            race: 'human'
        };
        var worthy2 = {
            race: 'dwarf'
        };
        var unworthy = {
            race: 'gnoll'
        };
        var missing = {};

        assert.ok(areRequirementsMet(worthy1, list), 'true positive');
        assert.ok(areRequirementsMet(worthy2, list), 'true positive');
        assert.notOk(areRequirementsMet(unworthy, list), 'true negative');
        assert.notOk(areRequirementsMet(missing, list), 'missing property leads to fail');
    });

    it('properly works with range requirements', function () {
        var range = {
            str: {
                min: 10,
                max: 12
            }
        };

        var worthy1 = {
            str: 10
        };
        var worthy2 = {
            str: 11
        };
        var worthy3 = {
            str: 12
        };
        var tooWeak = {
            str: 5
        };
        var tooStrong = {
            str: 24
        };

        assert.ok(areRequirementsMet(worthy1, range), 'true positive');
        assert.ok(areRequirementsMet(worthy2, range), 'true positive');
        assert.ok(areRequirementsMet(worthy3, range), 'true positive');

        assert.notOk(areRequirementsMet(tooWeak, range), 'you are too weak to wear this armour');
        assert.notOk(areRequirementsMet(tooStrong, range), 'you are too strong for this armour, you gonna rip it apart');

        assert.notOk(areRequirementsMet({}, range), 'missing property leads to fail');
    });

    it('properly works with primitive requirements', function () {
        var primitive = {
            dex: 25
        };

        var worthy = {
            dex: 25
        };

        var unworthy1 = {
            dex: 24
        };

        var unworthy2 = {
            dex: 26
        };

        assert.ok(areRequirementsMet(worthy, primitive), 'just right');

        assert.notOk(areRequirementsMet(unworthy1, primitive), 'too clumsy!');
        assert.notOk(areRequirementsMet(unworthy2, primitive), 'too nimble!');

        assert.notOk(areRequirementsMet({}, primitive), 'missing property leads to fail');
    });

    it('properly works with complex requirements', function () {
        var slingRequirements = {
            race: ['elf', 'halfling'],
            str: {min: 5, max: 7},
            dex: 24
        };

        var goodHobbit = { race: 'halfling', str: 5, dex: 24};
        var nobleElf = { race: 'elf', str: 7, dex: 24};

        var dirtyHuman = { race: 'human', str: 6, dex: 24};
        var weakHuman = { race: 'human', str: 4, dex: 24};
        var weakAndClumsyHuman = { race: 'human', str: 8, dex: 20};
        var invalidElf = { race: 'elf', str: 6}; // no dexterity
        var invalidHalfling = { race: 'halfling', dex: 24}; // no strength
        var racelessBastard = { str: 7, dex: 24}; // no race
        var invalidHobbit = { race: 'halfling' }; // two missing properties

        assert.ok(areRequirementsMet(goodHobbit, slingRequirements), 'good hobbit');
        assert.ok(areRequirementsMet(nobleElf, slingRequirements), 'noble elf');

        assert.notOk(areRequirementsMet(dirtyHuman, slingRequirements), 'dirty human');
        assert.notOk(areRequirementsMet(weakHuman, slingRequirements), 'dirty weak human');
        assert.notOk(areRequirementsMet(weakAndClumsyHuman, slingRequirements), 'dirty weak and clumsy human');
        assert.notOk(areRequirementsMet(invalidElf, slingRequirements), 'invalid elf');
        assert.notOk(areRequirementsMet(invalidHalfling, slingRequirements), 'invalid hobbit');
        assert.notOk(areRequirementsMet(racelessBastard, slingRequirements), 'no kin, no kith');
        assert.notOk(areRequirementsMet(invalidHobbit, slingRequirements), 'one more invalid hobbit');
    });

    it('throws errors when invalid arguments passed', function () {
        var requirement = {dex: 12};
        assert.throws(
            areRequirementsMet.bind(null, undefined, requirement),
            Error,
            'Invalid wearer',
            'undefined wearer'
        );
        assert.throws(
            areRequirementsMet.bind(null, null, requirement),
            Error,
            'Invalid wearer',
            'null wearer'
        );
        assert.throws(
            areRequirementsMet.bind(null, 0, requirement),
            Error,
            'Invalid wearer',
            '0 wearer'
        );
        assert.throws(
            areRequirementsMet.bind(null, '', requirement),
            Error,
            'Invalid wearer',
            '"" wearer'
        );
        assert.throws(
            areRequirementsMet.bind(null, [], requirement),
            Error,
            'Invalid wearer',
            '[] wearer'
        );
    });
});