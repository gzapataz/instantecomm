'use strict'

module.exports = class StringUtil {

  constructor(string){
    this.string = string;
  }

  
removeSpecialCharacters(){
    var newString = this.string.replace(/[-+()\s]/g, '');
    return newString;
  }
}