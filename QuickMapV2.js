"use strict"
/*
No license here!

*/
class Root {
    constructor() {

    }
    forEach() {

    }
    every() {
        return true;
    }

}

class ListNode {
    constructor() {

    }
    init(child, parent, node, id) {
        this.CHILD = child;
        this.NODE = node;
        this.ID = id;
        this.PARENT = parent;
    }

    destroy() {
        this.PARENT.CHILD = this.CHILD;
        this.CHILD.PARENT = this.PARENT;
        this.CHILD = null;
        this.NODE = null;
        this.ID = null;
        this.PARENT = null;
        ListNode.dest(this);
    }
    forEach(call) {
        call(this.NODE, this.ID);
        this.CHILD.forEach(call);

    }
    every(call) {
        if (!call(this.NODE, this.ID)) return false;
        return this.CHILD.forEach(call);
    }

}


function Pool() {
    this.pool = [];
    this.size = 0;
    this.pnew = pnew;
    this.dest = dest
}

function pnew(a, b, c, d) {
    var newObj = null;

    if (this.size === 0) {
        newObj = new this();
        newObj.init(a, b, c, d)
    } else {
        newObj = this.pool[--this.size];
        this.pool[this.size] = null;
        newObj.init(a, b, c, d)
    }
    return newObj;
}

function dest(obj) {

    this.pool[this.size++] = obj
}
ListNode.Pool = Pool;

ListNode.Pool();


class QuickMapV2 {
    constructor() {
        this.CHILD = new Root()
        this.ARRAY = [];

    }

    set(id, node) {
        var n = ListNode.pnew(this.CHILD, this, node, id);
        this.CHILD.PARENT = n;
        this.CHILD = n;
        this.ARRAY[id] = n;
        return n;
    }
    delete(id) {
        this.ARRAY[id].destroy();
        this.ARRAY[id] = null;
    }
    get(id) {
        return this.ARRAY[id].NODE;
    }
    forEach(call) {
        this.CHILD.forEach(call)
    }
    every(call) {
        return this.CHILD.every(call)
    }

}