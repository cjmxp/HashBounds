
[![NPM](https://img.shields.io/badge/Module-Npm-blue.svg)](https://www.npmjs.com/package/hashbounds)
[![Donate](https://img.shields.io/badge/Donate-Paypal-brightgreen.svg)](https://paypal.me/andrews54757)

# HashBounds
A super efficient collision check reducer using pos hashes that can handle bounds. Also a good snack made out of potato made for programmers on their lunch breaks

# Usage
> npm install hashbounds

##### Hashbounds(cellsize,dontUseBounds?,useCenter?,var)

```
var HashBounds = require('hashbounds')
var hashBounds = new HashBounds(10,2) // size of parent cells, amount of levels
var node = {
bounds: {
x: 10,
y: 10,
width: 5,
height: 3
}
}
hashBounds.insert(node) // add node

node.bounds.x = 4
hashBounds.update(node) // Update node (for moving cells)
var bounds = {
x: 3,
y: 0,
width: 10,
height: 10
}
var nodes = hashBounds.toArray(bounds) // gets nodes that is in/near the bounds
console.log(nodes.length)
hashBounds.delete(node)// delete node
```




## How does it work?
This modules works by putting the objects into a grid using their "hashes". First, the bounds top left corner and bottom right corners are determined

```
(x,y)=>p1 
 _______________
|               |
|               |
|_______________|
              (x,y)=>p2
```

Then, it puts the node into the cells that touch the box. It is rather complicated.


## Methods:

1. insert(node): Insert a node into the map
2. delete(node): Remove a node from the map
3. update(node): Update the node in the map
4. clear(): Clear all nodes in the map
5. toArray(bounds): Get an array of objects in certain bounds
6. forEach(bounds,call): Loop through objects in certain bounds
7. every(bounds,call): Same a .forEach(bounds), but stops execution when returning false

