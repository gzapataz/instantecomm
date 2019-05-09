'use strict'

module.exports = class ArrayUtil {

  constructor(array){
    this.array = array;
  }

  contains(value){
    var i = this.array.length;
    while (i--) {
       if (this.array[i] === value) {
           return true;
       }
    }
    return false;
  }
}