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
    constructor(power, lvl, max) {
        this.INITIAL = power;
        this.LVL = lvl;
        this.MAX = max;
        this.MIN = power;
        this.LEVELS = []
        this.lastid = 0;
        this.BASE = false;
        this.createLevels()
        this.log2 = [];
        this.setupLog2()
    }
    setupLog2() {
        for (var i = 0; i < 32768; ++i) {
            this.log2.push(Math.floor(Math.log2(i + 1)))
        }
    }
    createLevels() {
        this.LEVELS = [];

        var last = false;
        for (var i = this.LVL - 1; i >= 0; --i) {
            var a = this.INITIAL + i;
            var b = 1 << a;
            var grid = new Grid(a, i, Math.ceil(this.MAX / b), last)
            if (!this.BASE) this.BASE = grid;
            this.LEVELS[i] = grid;
            last = grid;
        }

    }
    clear() {
        this.createLevels();
    }
    update(node) {
        this.delete(node)
        this.insert(node)
    }
    insert(node) {
        if (node.hash) throw "ERR: A node cannot be already in a hash!"
        var bounds = node.bounds;
        node.hash = {}
        if (!node._HashID) node._HashID = ++this.lastid;
        if (node._HashSize == node.bounds.width + node.bounds.height) {
            this.LEVELS[node._HashIndex].insert(node);
            return;
        }

        var index = this.log2[(Math.max(node.bounds.width, node.bounds.height) >> this.MIN)]
        if (index === undefined || index >= this.LVL) index = this.LVL - 1;

        node._HashIndex = index;
        node._HashSize = node.bounds.width + node.bounds.height;
        this.LEVELS[index].insert(node);
        //for (var i = 0; i < len; ++i) {
        //   if (this.LEVELS[len - i - 1].insert(node)) break;
        //}
    }


    delete(node) {
        if (!node.hash) throw "ERR: Node is not in a hash!"
        this.LEVELS[node.hash.level].delete(node)
        node.hash = null;
    }
    toArray(bounds) {
        return this.BASE.toArray(bounds);
    }
    every(bounds, call) {
        return this.BASE.every(bounds, call);
    }
    forEach(bounds, call) {


        this.BASE.forEach(bounds, call)



    }

}