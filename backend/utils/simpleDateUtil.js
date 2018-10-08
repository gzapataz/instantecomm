'use strict'

module.exports = class SimpleDateUtil {

  constructor(startTime, endTime){
    this.startTime = startTime;
    this.endTime = endTime;
  }

  /**
   * 
   */
  getStartDate(){
    if(this.startTime != undefined){
      var date = new Date(this.startTime);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(1);
      return date;
    }
    else{
      return "";
    }
  }

  getEndDate(){
    if(this.startTime != undefined){
      var date = new Date(this.endTime);
      date.setHours(11);
      date.setMinutes(59);
      date.setSeconds(59);
      return date;
    }
    else{
      return "";
    }
  }
}