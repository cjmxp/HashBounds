"use strict"
/*
    Copyright 2016 Andrew S

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
var HashBounds = class HashBounds {
    constructor(size,pn) {
        this.size = size;
        this.map = {};
        this.key = 0;
        this.pn = pn;
        this.allnodes = [];
        this.data = {}
    }
    getLength() {
     return this.allnodes.length   
    }
    getNxt() {
        return this.key ++;
    }
    getWithMerged(bounds) {
        return this.getNodes(bounds)
    }
    getNodes(bounds) {
        var p1 = {x:bounds.x,y:bounds.y}
        var p2 = {x:bounds.x + bounds.width,y: bounds.y + bounds.height}
        var a = this.getKey(p1)
        var b = this.getKey(p2)
       
        var n = ""
        var result = [];
         for (var i = a.y; i < b.y + 1; i++) {
            for (var j = a.x; j < b.x + 1; j++) {
                var ke = j + ":" + i;
                if (this.map[ke]) {
                 // n += ke + "|" + this.map[ke].length + ","
                this.map[ke].forEach((node)=>{
                    result.push(this.data[node.key])
                    
                })
                }
            }
            
        }

        return result
    }
    getKey(xy) {
        return {x:Math.min(Math.floor(xy.x/this.size),0),y:Math.min(Math.floor(xy.y/this.size),0)}
    }
    delete(node) {
        var ind = this.allnodes.indexOf(node)
        if (ind != -1) this.allnodes.splice(node)
        if (!node.hash) return false;
         var a = node.hash.a
         var b = node.hash.b
        
        
          for (var i = a.y; i < b.y + 1; i++) {
            for (var j = a.x; j < b.x + 1; j++) {
                var ke = j + ":" + i;
                if (this.map[ke]) {
                var ind = this.map[ke].indexOf(node.hash) 
                if (ind != -1)
                this.map[ke].splice(ind,1)
                    }
            }
            
        }
        this.data[node.hash.id] = false;
        node.hash = [];
        return true;
    }
    update(node) {
        if (!node.hash) return false;
         var a = node.hash.a
         var b = node.hash.b
          var p1 = {x:node.bounds.x,y:node.bounds.y}
        var p2 = {x:node.bounds.x + node.bounds.width,y: node.bounds.y + node.bounds.height}
        
        var c = this.getKey(p1)
        var d = this.getKey(p2)
        
        
          for (var i = a.y; i < b.y + 1; i++) {
            for (var j = a.x; j < b.x + 1; j++) {
                if (!(i > c.y && i < d.y && j > c.x && j < d.x)) {
                var ke = j + ":" + i;
                if (this.map[ke]) {
                var ind = this.map[ke].indexOf(node.hash) 
                if (ind != -1)
                this.map[ke].splice(ind,1)
                    }
                    }
            }
            
        }
        
        this.insert(node)
        return true;
    }

    insert(node) {
        if (this.pn) {
            node.bounds = {
      x: node.position.x - node.size,
      y: node.position.y - node.size,
      width: node.size * 2,
      height: node.size * 2
  }
        }
        if (this.allnodes.indexOf(node) == -1) this.allnodes.push(node)
        var p1 = {x:node.bounds.x,y:node.bounds.y}
        var p2 = {x:node.bounds.x + node.bounds.width,y: node.bounds.y + node.bounds.height}
        var a = this.getKey(p1)
        var b = this.getKey(p2)
    
        var key = (node.hash && node.hash.key) ? node.hash.key : this.getNxt()
        node.hash = {
         
            a: a,
            b: b,
            key: key,
            id: ""
        }
        this.data[key] = node
        
        for (var i = a.y; i < b.y + 1; i++) {
            for (var j = a.x; j < b.x + 1; j++) {
                var ke = j + ":" + i;
      
                if (!this.map[ke]) this.map[ke] = [];
                if (this.map[ke].indexOf(node.hash) == -1)
                    node.hash.id += ke + ","
                this.map[ke].push(node.hash)
            }
            
        }
    }
}
module.exports = HashBounds
