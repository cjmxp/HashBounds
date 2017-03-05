
#define NULL 0
class LinkedListNode {
  public:
     LinkedListNode* CHILD;
     int NODE;
     void forEach (int(*)(int));
     int every (int(*)(int));
     void destroy (void);
     void remove(int);
  
};
void LinkedListNode::forEach(int(*call)(int)) {
  call(NODE);
    if (CHILD) CHILD->forEach(call);
}
int LinkedListNode::every(int(*call)(int)) {
  if (!call(NODE)) return 0;
  
  if (!CHILD) return 1;
  
    return CHILD->every(call);
}
void LinkedListNode::remove(int node) {
  if (CHILD && CHILD->NODE == node) {
    CHILD = CHILD->CHILD; 
  } else {
   CHILD->remove(node);
  }
  
}
class LinkedList {
 public:
  LinkedListNode* CHILD = NULL;
  void set(int);
  void forEach(int(*)(int));
  int every(int(*)(int));
  void remove(int);
  void insert(int);
    
};
void LinkedList::insert(int val) {
  LinkedListNode node;
  node.NODE = val;
  if (CHILD) node.CHILD = CHILD; else node.CHILD = NULL;
  CHILD = &node;
}
void LinkedList::forEach(int(*call)(int)) {
 if (CHILD) CHILD->forEach(call);
}
int LinkedList::every(int(*call)(int)) {
  if (CHILD) return CHILD->every(call); else return 1;
}
void LinkedList::remove(int node) {
  if (CHILD && CHILD->NODE == node) {
    CHILD = CHILD->CHILD; 
  } else {
   CHILD->remove(node);
  }
}

int main() {
LinkedList list;

  return 1;
}
