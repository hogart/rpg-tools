/* eslint-env mocha */

'use strict';

var assert = require('chai').assert;
var Dice = require('../lib/Dice');

describe('Dice', function () {
	describe('Dice.parse', function () {
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

	describe('Dice.roll', function () {
		it('should properly rolls dice', function () {
			// plain rolls
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

			assert.ok(inRange, '"d" dice rolls properly');


			// lowest rolls
			dice = new Dice('3d6-L');
			inRange = true;

			for (i = 100; i; i--) {
				rollResult = dice.roll();
				if (rollResult > 6 && rollResult < 1) {
					inRange = false;
					break;
				}
			}

			assert.ok(inRange, '"3d6-L" dice rolls properly');


			// highest rolls
			dice = new Dice('3d6-H');
			inRange = true;

			for (i = 100; i; i--) {
				rollResult = dice.roll();
				if (rollResult > 6 && rollResult < 1) {
					inRange = false;
					break;
				}
			}

			assert.ok(inRange, '"3d6-H" dice rolls properly');


			// rolls with addition
			dice = new Dice('3d6+3');
			inRange = true;

			for (i = 100; i; i--) {
				rollResult = dice.roll();
				if (rollResult > 21 && rollResult < 6) {
					inRange = false;
					break;
				}
			}

			assert.ok(inRange, '"3d6+3" dice rolls properly');


			// rolls with substraction
			dice = new Dice('d20-10');
			inRange = true;

			for (i = 100; i; i--) {
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


