'use strict'

module.exports = class CompareArrayUtil {

  constructor(array1, array2){
    this.array1 = array1;
    this.array2 = array2;
  }

  getArrayIntersect(){
    var resultArray = [];
    if(this.array1 != undefined && this.array2 != undefined){
      for(var i = 0; i < this.array1.length; i++){
          for(var k = 0; k < this.array2.length; k++){
              var elem1 = new String(this.array1[i]).valueOf();
              var elem2 = new String(this.array2[k]).valueOf();
              if(elem1 == elem2){
                  resultArray.push(this.array1[i]);
                  break;
              }
          }
      }
    }
    return resultArray;

  }

  getArrayDifference(){
    for(var i=0; i < this.array2 .length; i++) {
      for(var j=0; j < this.array1.length; j++) {
        var elem1 = new String(this.array1[j]).valueOf();
        var elem2 = new String(this.array2[i]).valueOf();
        if(elem1 == elem2) {
          this.array1.splice(j, 1);
        }
      }
    }
    return this.array1;
  }

}