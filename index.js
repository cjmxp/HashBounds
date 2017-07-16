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

var Grid = require('./Grid.js');
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
        var pow = 1 << this.LVL;
        for (var i = 0; i < pow; ++i) {
            this.log2[i - 1] = Math.floor(Math.log2(i))
        }
    }
    createLevels() {
        this.LEVELS = [];
        this.BASE = null;
        this.ID = Math.floor(Math.random() * 100000);
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
    update(node, bounds) {
        this.delete(node)
        this.insert(node, bounds)
    }
    insert(node, bounds) {
        if (node._HashParent === this.ID) throw "ERR: A node cannot be already in this hash!"; // check if it already is inserted

        this.convertBounds(bounds);

        if (node._HashParent !== this.ID) {
            node._HashID = ++this.lastid;
            node.hash = {}
            node._HashParent = this.ID;
        }

        if (node._HashSizeX === bounds.width && node._HashSizeY === bounds.height) {
            this.LEVELS[node._HashIndex].insert(node, bounds);
            return;
        }

        var index = this.log2[(Math.max(bounds.width, bounds.height) >> this.MIN)]
        if (index === undefined) index = this.LVL - 1;

        node._HashIndex = index;
        node._HashSizeX = bounds.width;
        node._HashSizeY = bounds.height;

        this.LEVELS[index].insert(node, bounds);
    }

    delete(node) {
        if (node._HashParent !== this.ID) throw "ERR: Node is not in this hash!"
        this.LEVELS[node.hash.level].delete(node)
        node._HashParent = 0;
    }
    toArray(bounds) {
        this.convertBounds(bounds);

        return this.BASE.toArray(bounds);
    }
    every(bounds, call) {
        this.convertBounds(bounds);

        return this.BASE.every(bounds, call);
    }
    forEach(bounds, call) {
        this.convertBounds(bounds);

        this.BASE.forEach(bounds, call)
    }
    mmToPS(bounds) { // min-max to pos-size
        bounds.x = bounds.minX;
        bounds.y = bounds.minY;
        bounds.width = bounds.maxX - bounds.minX;
        bounds.height = bottom.maxY - bounds.minY;
    }
    psToMM(bounds) { // pos-size to min-max

        bounds.minX = bounds.x;
        bounds.minY = bounds.y;

        bounds.maxX = bounds.x + bounds.width;
        bounds.maxY = bounds.y + bounds.height;
    }
    convertBounds(bounds) { // convert for our purposes
        if (bounds.TYPE === undefined) {
            if (bounds.x !== undefined) {
                this.psToMM(bounds);
                bounds.TYPE = 1;
            } else {
                this.mmToPs(bounds);
                bounds.TYPE = 2;
            }

        } else if (bounds.TYPE === 1) {
            this.psToMs(bounds);
        } else if (bounds.TYPE === 2) {
            this.mmToPs(bounds);
        }
    }
}
