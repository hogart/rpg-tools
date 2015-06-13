/* eslint-env mocha */

'use strict';

var assert = require('chai').assert;
var Dice = require('../lib/Dice');

describe('Dice', function () {
    describe('.parse', function () {
        it('should properly parse dice formats with defaults', function () {
            var dice;

            it('all defaults', function () {
                dice = new Dice('d');
                assert.equal(dice.rolls, 1, '"d" properly parsed rolls');
                assert.equal(dice.sides, 6, '"d" properly parsed sides');
            });

            it('default rolls', function () {
                dice = new Dice('d4');
                assert.equal(dice.rolls, 1, '"d4" properly parsed rolls');
                assert.equal(dice.sides, 4, '"d4" properly parsed sides');
            });

            it('default sides', function () {
                dice = new Dice('3d');
                assert.equal(dice.rolls, 3, '"3d" properly parsed rolls');
                assert.equal(dice.sides, 6, '"3d" properly parsed sides');
            });

            it('no defaults', function () {
                dice = new Dice('5d5');
                assert.equal(dice.rolls, 5, '"5d5" properly parsed rolls');
                assert.equal(dice.sides, 5, '"5d5" properly parsed sides');
            });
        });

        it('should properly parse additions to dice rolls', function () {
            var dice;

            it('with choosing lowest', function () {
                dice = new Dice('3d-L');

                assert.equal(dice.rolls, 3);
                assert.equal(dice.sides, 6);
                assert.isTrue(dice.specials.chooseLowest);
                assert.isFalse(dice.specials.chooseHighest);
                assert.isFalse(dice.specials.add);
            });

            it('with choosing highest', function () {
                dice = new Dice('3d8-H');

                assert.equal(dice.rolls, 3);
                assert.equal(dice.sides, 8);
                assert.isFalse(dice.specials.chooseLowest);
                assert.isTrue(dice.specials.chooseHighest);
                assert.isFalse(dice.specials.add);
            });

            it('with substracting', function () {
                dice = new Dice('2d20-10');

                assert.equal(dice.rolls, 2);
                assert.equal(dice.sides, 20);
                assert.isFalse(dice.specials.chooseLowest);
                assert.isFalse(dice.specials.chooseHighest);
                assert.equal(dice.specials.add, -10);
            });

            it('with adding', function () {
                dice = new Dice('3d6+6');

                assert.equal(dice.rolls, 3);
                assert.equal(dice.sides, 6);
                assert.isFalse(dice.specials.chooseLowest);
                assert.isFalse(dice.specials.chooseHighest);
                assert.equal(dice.specials.add, 6);
            });
        });
    });

    describe('.roll', function () {
        it('should properly rolls dice', function () {
            it('should properly roll plain "d" dice', function () {
                var dice = new Dice('d');
                var inRange = true;
                var rollResult;

                for (var i = 100; i; i--) {
                    rollResult = dice.roll();
                    if (rollResult > 6 && rollResult < 1) {
                        inRange = false;
                        break;
                    }
                }

                assert.ok(inRange, '"d" die rolls properly');
            });

            it('should properly roll -L dice', function () {
                var dice = new Dice('3d6-L');
                var inRange = true;
                var rollResult;

                for (var i = 100; i; i--) {
                    rollResult = dice.roll();
                    if (rollResult > 6 && rollResult < 1) {
                        inRange = false;
                        break;
                    }
                }

                assert.ok(inRange, '"3d6-L" dice rolls properly');
            });

            it('should properly roll -H dice', function () {
                var dice = new Dice('3d6-H');
                var inRange = true;
                var rollResult;

                for (var i = 100; i; i--) {
                    rollResult = dice.roll();
                    if (rollResult > 6 && rollResult < 1) {
                        inRange = false;
                        break;
                    }
                }

                assert.ok(inRange, '"3d6-H" dice rolls properly');
            });

            it('should properly roll +N dice', function () {
                var dice = new Dice('3d6+3');
                var inRange = true;
                var rollResult;

                for (var i = 100; i; i--) {
                    rollResult = dice.roll();
                    if (rollResult > 21 && rollResult < 6) {
                        inRange = false;
                        break;
                    }
                }

                assert.ok(inRange, '"3d6+3" dice rolls properly');
            });

            it('should properly roll -N dice', function () {
                // rolls with substraction
                var dice = new Dice('d20-10');
                var inRange = true;
                var rollResult;

                for (var i = 100; i; i--) {
                    rollResult = dice.roll();
                    if (rollResult > 10 && rollResult < -10) {
                        inRange = false;
                        break;
                    }
                }

                assert.ok(inRange, '"d20-10" dice rolls properly');
            });
        });

    });
});


