"use strict"
/*
       HashBounds - A bound based spacial hashing system
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

var HashBounds = class HashBounds {
    constructor(size,pn) {
        this.size = size;
        this.map = {};
        this.key = 0;
        this.pn = pn;
        this.data = {}
        
    }

   
    getNxt() {
        return this.key ++;
    }
    
    toArray(bounds) {
           if (!bounds) throw "Bounds not specified"
        var p1 = {x:bounds.x,y:bounds.y}
        var p2 = {x:bounds.x + bounds.width,y: bounds.y + bounds.height}
        var a = this.getKey(p1)
        var b = this.getKey(p2)
       
        var table = {}; // hashtable
        var result = [];
         for (var i = a.y; i < b.y + 1; i++) {
            for (var j = a.x; j < b.x + 1; j++) {
                var ke = j + ":" + i;
                if (this.map[ke]) {
                 // n += ke + "|" + this.map[ke].length + ","
                     
               this.map[ke].forEach((node)=>{
                     
                       if (table[node.key]) return;
                       
                    result.push(this.data[node.key])
                   table[node.key] = true; 
                })
                       
                }
            }
            
        }

        return result
    }
     forEach(bounds,call) {
                  if (!bounds) throw "Bounds not specified"
        var p1 = {x:bounds.x,y:bounds.y}
        var p2 = {x:bounds.x + bounds.width,y: bounds.y + bounds.height}
        var a = this.getKey(p1)
        var b = this.getKey(p2)
       
        var table = {}; // hashtable
        
         for (var i = a.y; i < b.y + 1; i++) {
            for (var j = a.x; j < b.x + 1; j++) {
                var ke = j + ":" + i;
                if (this.map[ke]) {
                 // n += ke + "|" + this.map[ke].length + ","
                     
               this.map[ke].forEach((node)=>{
                     
                       if (table[node.key]) return;
                       
                    call(this.data[node.key],node.key)
                   table[node.key] = true; 
                })
                       
                }
            }
            
        }
     }
       every(bounds,call) {
               if (!bounds) throw "Bounds not specified"
        var p1 = {x:bounds.x,y:bounds.y}
        var p2 = {x:bounds.x + bounds.width,y: bounds.y + bounds.height}
        var a = this.getKey(p1)
        var b = this.getKey(p2)
       
        var table = {}; // hashtable
       
         for (var i = a.y; i < b.y + 1; i++) {
            for (var j = a.x; j < b.x + 1; j++) {
                var ke = j + ":" + i;
                if (this.map[ke]) {
                 // n += ke + "|" + this.map[ke].length + ","
                     
               if (!this.map[ke].every((node)=>{
                     
                       if (table[node.key]) return true;
                       
                    return call(this.data[node.key],node.key)
                   table[node.key] = true; 
                })) break;
                       
                }
            }
            
        }    
       }
       find(x,y) {
              
              
       }
    getKey(xy) {
        return {x:~~(xy.x/this.size),y:~~(xy.y/this.size)}
    }
    delete(node) {
        if (!node.hash) return false;
         var a = node.hash.a
         var b = node.hash.b
        if (!a || !b) return false;
        
          for (var i = a.y; i < b.y + 1; i++) {
            for (var j = a.x; j < b.x + 1; j++) {
                var ke = j + ":" + i;
                if (this.map[ke]) {
                if (this.map[ke][node.hash.key]) this.map[ke].delete(node.hash.key)
                    }
            }
            
        }
        this.data[node.hash.id] = false
        node.hash = false;
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
        
        if (c == a  && d == b) return
          for (var i = a.y; i < b.y + 1; i++) {
            for (var j = a.x; j < b.x + 1; j++) {
             
                var ke = j + ":" + i;
                if (this.map[ke]) {
                if (this.map[ke][node.hash.key]) this.map[ke].delete(node.hash.key)
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
      
                if (!this.map[ke]) this.map[ke] = new Map();
                this.map[ke].set(node.hash.key,node.hash)
            }
            
        }
    }
}
module.exports = HashBounds
