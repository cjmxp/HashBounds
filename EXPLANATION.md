## Explanation
Explanation of how this works.

### Components
* QuadTree
* Heiracheal Spatial Hash
* Linked List

#### QuadTree
A quadtree's main advantage is the fact that a query can be made very quickly. This is because it can toss out large amounts of buckets quickly. In a regular spatial hash, if there are no items, then it would still inefficiently loop through all the cells in the query. HashBounds uses a QuadTree's query method, so that if there are no items in an area, it wont loop through many empty cells. 

#### Heiracheal Spatial Hash
A Heiracheal Spatial Hash is a Spatial Hash on steroids. It is a multi-level spatial hash. Larger objects go in larger cells, and smaller objects go in smaller cells. An object can have many cells "assigned" to it. bounds overlapping two cells are put into both cells. HashBounds uses a Heiracheal Spatial Hash insertion/deletion scheme due to the fact that A: if a query is in the center of the map, then it wont return all objects, and B: It's insertion time is basically instant.

#### Linked List
A linked list is used in HashBounds so that item deletion is quick. If a regular array is used, then it would have to shift every item to the right of the removed item, left by one. A Linked List ensures that item deletion is quick and easy

#### Setup
When a HashBounds object is initiated, it created levels and cells. Then, the cells are ordered into a grid, and are ordered into a quadtree-like format. 



