#include <node.h>



class LinkedListNode {
  public:
     LinkedListNode* CHILD;
     int NODE;
     void forEach(int);
     int every(int);
     void destroy(void);
  
}
void LinkedListNode::forEach(int (*call)(int)) {
  call(NODE);
    if (CHILD) CHILD->call(call);
}
int LinkedListNode::every(int (*call)(int)) {
  if (!call(NODE)) return 0;
  
  if (!CHILD) return 1;
  
    return CHILD->call(call);
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
  LinkedListNode* CHILD;
  void set(int);
  void forEach(int);
  void every(int);
  void remove(int);
  init();
    
}
void LinkedList::insert(int val) {
  LinkedListNode node;
  node.NODE = val;
  if (LinkedListNode) node.CHILD = &LinkedListNode;
  CHILD = &node;
}
void LinkedList::forEach(int call) {
 if (CHILD) CHILD->forEach(call);
}
int LinkedList::every(int call) {
  if (CHILD) return CHILD->forEach(call); else return 1;
}
void LinkedList::remove(int node) {
  if (CHILD && CHILD->NODE == node) {
    CHILD = CHILD->CHILD; 
  } else {
   CHILD->remove(node);
  }
}
