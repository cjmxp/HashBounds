"use strict"
/*
       HashBounds - A hierarchical spacial hashing system
    Copyright (C) 2016 Andrew S

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var Grid = require('./Grid.js')
module.exports = class HashBounds {
    constructor(inithash, lvl) {
        this.INITIAL = inithash;
        this.LVL = lvl;
        this.LEVELS = []
        this.lastid = 0;
        this.createLevels()

    }
    createLevels() {
        this.LEVELS = [];
        this.LEVELS.push(new Grid(this.INITIAL, 0))
        var a = this.INITIAL;
        for (var i = 0; i < this.LVL; i++) {
            a = a / 2
            this.LEVELS.push(new Grid(a), i + 1)
        }
    }
    insert(node) {
        if (node.hash) throw "ERR: A node cannot be already in a hash!"
        var bounds = node.bounds;
        node.hash = {
            id: this.lastid++,
        }
        var len = this.LEVELS.length
        for (var i = 0; i < len; i++) {
            if (this.LEVELS[len - i - 1].insert(node)) break;
        }
    }


    delete(node) {
        if (!node.hash) throw "ERR: Node is not in a hash!"
        this.LEVELS[node.hash.level].delete(node)
        node.hash = null;
    }
    toArray(bounds) {
        var array = [];
        for (var i = 0; i < this.LEVELS.length; i++) {
            this.LEVELS[i].toArray(array, bounds)
        }
        return array;
    }
    every(bounds, call) {
        for (var i = 0; i < this.LEVELS.length; i++) {
            if (!this.LEVELS[i].every(bounds, call)) break;
        }
    }
    forEach(bounds, call) {
        for (var i = 0; i < this.LEVELS.length; i++) {
            this.LEVELS[i].forEach(bounds, call)
        }
    }

}