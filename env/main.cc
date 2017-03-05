#include <unordered_map>

class Holder {
  public:
    Holder* PARENT;
    Holder* CHILDREN[4];
    int ChildIndex = 0;
    int LEN = 0;
    int POWER,LVL,X,Y;
    int BoundX,BoundY,BoundWidth,BoundHeight;
    void init(Holder*,int,int,int,int);
    int checkIntersect(int,int,int,int,int,int,int,int);
    void set(int,int);
    void delete(int);
    void add(void);
    void sub(void);
    void forEach(int,int,int,int,void (*)(int));
    int every(int,int,int,int,int(*)(int));
};
void Holder::init(Holder* parent,int x, int y, int power, int lvl) {
  PARENT = parent;
  PARENT->CHILDREN[PARENT->ChildIndex++] = this;
  X = x;
  Y = y;
  POWER = power;
  LVL = LVL;
  BoundX = x << power;
  BoundY = y << power;
  BoundWidth = 1 << power;
  BoundHeight = 1 << power;
}
int Holder::checkIntersect(int ax,int ay,int aw,int ah,int bx,int by,int bw,int bh) {
  int x1 = ax + aw;
  int y1 = ay + ah;
  int x2 = bx + bw;
  int y2 = by + bh;
  
  return !(bx >= x1 || x2 <= ax || by >= y1 || y2 <= ay);
}
void Holder::set(int id, int node) {
  // need map
  add();
}
void Holder::delete(int id) {
  // need map
 sub(); 
}
void Holder::add(void) {
  ++LEN;
    PARENT->add();
}
void Holder::sub(void) {
    --LEN;
    PARENT->sub();
}
void Holder::forEach(int x, int y, int w, int h,void (*call)(int)) {
        if (!LEN) return;
         // need map
        if (CHILDREN[0]) {
            for (var i = 0; i < ChildIndex; ++i) {
                if (checkIntersect(x,y,w,h, CHILDREN[i].BoundX, CHILDREN[i].BoundY,CHILDREN[i].BoundWidth,CHILDREN[i].BoundHeight)) {
                    this.CHILDREN[i].forEach(x,y,w,h, call)
                }
            }

        }
        return;
}
int Holder::every(int x, int y, int w, int h,int (*call)(int)) {
        if (!LEN) return 1;
         // need map
        if (CHILDREN[0]) {
            for (var i = 0; i < ChildIndex; ++i) {
                if (checkIntersect(x,y,w,h, CHILDREN[i].BoundX, CHILDREN[i].BoundY,CHILDREN[i].BoundWidth,CHILDREN[i].BoundHeight)) {
                    if (!this.CHILDREN[i].forEach(x,y,w,h, call)) return 0;
                }
            }

        }
        return 1;
    }
class FakeHolder {
  public:
    Holder* CHILDREN[4];
    int ChildIndex = 0;
    void add(void);
    void sub(void);
  
};
void FakeHolder::add(void) {
  
}
void FakeHolder::sub(void) {
  
}
class Grid {
 public:
  int POWER,LEVEL,SIZE,MIN;
  Grid* PREV;
  std::unordered_map<int, Grid*> DATA;
  void init(int,int,int,int,Grid*);
  int get(int,int,int,int,int (*)(int));
  void insert(int,int,int,int,int);
  void delete(int);
};
void Grid::init(int power, int level, int size, int min, Grid* prev) {
  POWER = power;
  LEVEL = level;
  SIZE = size;
  MIN = min * -1;
  PREV = prev;
  for (int j = MIN; j <= SIZE; ++j) {
    int x = j << 16;
    int bx = (j >> 1) << 16;
      for (int i = MIN; i <= SIZE; ++i) {
        int by = i >> 1;
        int key = x | i;
        Grid* pointer;
        if (PREV) pointer = this.PREV.DATA[bx | by]; else {
          FakeHolder fake;
          pointer = &fake;
        }
        Holder holder;
        Holder.init(pointer,j,i,POWER,LEVEL);
        DATA.insert({key,holder});
      }
  }
}
int Grid::get(int x, int y, int w, int h, int (*call)(int)) {
            int x1 = x;
            int y1 = y;
            int x2 = x + w;
            int y2 = y + h;
            int k1x = x1 >> POWER;
            int k1y = y1 >> POWER;
            int k2x = x2 >> POWER;
            int k2y = y2 >> POWER;
    for (int j = k1x; j <= k2x; ++j) {

            int x = j << 16;
      for (int i = k1y; i <= k2y; ++i) {
     int key = x | i;
         if (DATA[key]) {
                    if (!call(DATA[key])) return 0;
          }
      }
    }
  return 1;
}
void Grid::insert(int x,int y,int w,int h,int node) { // change int node.
  int x1 = x;
  int y1 = y;
  int x2 = x + w;
  int y2 = y + h; 
  int k1x = x1 >> POWER;
  int k1y = y1 >> POWER;
  int k2x = x2 >> POWER;
  int k2y = y2 >> POWER;
   node.hash.k1 = {k1x,k1y};
   node.hash.k2 = {k2x,k2y};
   node.hash.level = this.LEVEL;
   for (int j = k1x; j <= k2x; ++j) {
            int x = j << 16;
            for (int i = k1y; i <= k2y; ++i) {

                var ke = x | i;
                DATA[ke]->set(node._HashID,node);
            }

        }
}
 void Grid::delete(int node) {  // change int node
         int k1[] = node.hash.k1;
        int k2[] = node.hash.k2;
      
        for (int j = k1[0]; j < k2[0]; ++j) {
            int x = j << 16;
            for (int i = k1[1]; i < k2[1]; ++i) {


                var ke = x | i;

                DATA[ke]->delete(node._HashID);
            }

        }
    }
