"use strict";
var Bucket = class Bucket {
 constructor(min,max,main,hash) {
  this.min = min;
  this.max = max;
  this.main = main;
  this.hash = hash
 }
 
}
var SPHash = class SPHash {
 constructor(bound,buckets) {
   this.bounds = bound
   this.amount = buckets
  this.buckets = {}; 
  this.createBuckets()
 }
  createBuckets() {
   var a = this.bounds.x 
  }
  
}
module.exports = SPHash
