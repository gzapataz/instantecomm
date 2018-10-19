'use strict'

module.exports = class SimpleDateUtil {

  constructor(startTime, endTime){
    this.startTime = startTime;
    this.endTime = endTime;
  }


  getStartFormatDate() {
    var date = new Date(this.startTime);
    var yyyy = date.getFullYear();
    var mm = date.getMonth(); // getMonth() is zero-based
    var dd  = date.getDate();
    return new Date(yyyy,mm,dd); // Leading zeros for mm and dd
  }

  getEndFormatDate() {
    var date = new Date(this.endTime);
    var yyyy = date.getFullYear();
    var mm = date.getMonth(); // getMonth() is zero-based
    var dd  = date.getDate();
    return new Date(yyyy,mm,dd); // Leading zeros for mm and dd
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