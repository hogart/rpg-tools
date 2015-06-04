(function (root, factory) {
    /* global define, module, require */
    if (typeof define === 'function' && define.amd) { // AMD
        define(['./lib/utils'], factory);
    } else if (typeof exports === 'object') { // Node, browserify and alike
        module.exports = factory(require('./lib/utils'));
    } else { // Browser globals (root is window)
        root.rpgToolsInventory = factory(root.rpgToolsUtils);
    }
}(this, function (_, gameUtils) {
    'use strict';

    /**
     * Various character's inventory machinations
     * @namespace
     */
    var inventory = {};

    /**
     * Unequips item from given slotName
     * @param {Object} attributes which object should be operated. In Mongoose it this, in Backbone it's this.attributes
     * @param {String} slotName
     * @param {Function} cb
     * @function
     */
    var unEquip = inventory.unEquip = function (attributes, slotName, cb) {
        if (!(slotName in attributes.equipped)) {
            cb({errors: 'Некорректное имя слота: ' + slotName}, this);
            return;
        }

        if (attributes.equipped[slotName]) {
            attributes.inventory.push(attributes.equipped[slotName]);
        }

        attributes.equipped[slotName] = {};

        cb && cb(null, attributes);
    };

    /**
     * Equips item which is located in inventory by given index
     * @param {Object} attributes which object should be operated. In Mongoose it's this, in Backbone it's this.attributes
     * @param {Number} index inventory slot number
     * @param {String} slotName where to equip
     * @param {Function} cb
     */
    inventory.equipFromInventory = function (attributes, index, slotName, cb) {
        if (index >= attributes.inventory.length) {
            cb({errors: 'Это еще откуда взялось?'}, this);
            return;
        }

        var item = attributes.inventory[index];

        if (!slotName) {
            slotName = item.slot;
        }

        if (!slotName) {
            cb({errors: 'Темный ужас из глубин ненадеваемого: ' + item.name}, this);
        }

        if (!(slotName in attributes.equipped)) {
            cb({errors: 'Некорректное имя слота: ' + slotName}, this);
            return;
        }

        if (item.slot != slotName) {
            cb({errors: 'Некорректный слот'}, this);
            return;
        }

        if (!gameUtils.areRequirementsMet(attributes, item.requirements)) {
            cb({errors: 'Не подходит по требованиям'}, this);
            return;
        }

        if (attributes.equipped[slotName]) {
            unEquip(attributes, slotName);
        }

        attributes.inventory.splice(index, 1);

        attributes.equipped[slotName] = item;

        cb(null, attributes);
    };

    inventory.isWearable = function (attributes, index, cb) {
        if (index >= attributes.inventory.length) {
            cb({errors: 'Это еще откуда взялось?'}, this);
            return;
        }

        var item = attributes.inventory[index];

        if (!gameUtils.areRequirementsMet(attributes, item.requirements)) {
            cb({errors: 'Не подходит по требованиям'}, this);
            return;
        }

        var slotName = item.slot;

        if (!slotName) {
            cb({errors: 'Темный ужас из глубин ненадеваемого: ' + item.name}, this);
        }

        if (item.isTwoHanded) {
            cb(null, ['leftHand', 'rightHand']);
        } else {
            cb(null, [slotName]);
        }
    };

    return inventory;
}));