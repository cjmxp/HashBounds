## Explanation
Explanation of how this works.

### Components
* QuadTree
* Heiracheal Spatial Hash

#### QuadTree
A quadtree's main advantage is the fact that a query can be made very quickly. This is because it can toss out large amounts of buckets quickly. In a regular spatial hash, if there are no items, then it would still inefficiently loop through all the cells in the query. HashBounds uses a QuadTree's query method, so that if there are no items in an area, it wont loop through many empty cells. 

#### Heiracheal Spatial Hash
A Heiracheal Spatial Hash is a Spatial Hash on steroids. It is a multi-level spatial hash. Larger objects go in larger cells, and smaller objects go in smaller cells. An object can have many cells "assigned" to it. bounds overlapping two cells are put into both cells. HashBounds uses a Heiracheal Spatial Hash insertion/deletion scheme due to the fact that A: if a query is in the center of the map, then it wont return all objects, and B: It's insertion time is basically instant.


#### Setup
When a HashBounds object is initiated, it created levels and cells. Then, the cells are ordered into a grid, and are ordered into a quadtree-like format. 

#### Insertion
When inserting objects, the object's Z-position is obtained from a log-based mathamatical equation. Then, it inserts the objects into the grid at that assigned level.

#### Query
When querying, it queries like a normal grid to get the "base" cells. The base cell's children are then recursed, filtering out cells like a quadtree.


