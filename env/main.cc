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
}
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

