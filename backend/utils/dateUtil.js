'use strict'

module.exports = class DateUtil {
  constructor(year, month, day, week) {
      this.year = year;
      this.month = month;
      this.day = day;
      this.week = Boolean(week);
  }


  /**
   * Devuelve el número de días de un mes
   */
  daysInAMonth() {
      return new Date(this.year, this.month, 0).getDate();
  }

  /**
   * 
   */
  getStartDate(){
    if(this.day != null && this.day != undefined){
      if(this.year == undefined){
        this.year = new Date().getFullYear();
      }
      if(this.month == undefined){
        this.month = new Date().getMonth() + 1;
      }
      var startDate = new Date(this.year,this.month - 1,this.day);

      if(this.week){
        startDate = this.startOfWeek(startDate);
      }

      return startDate;
    }
    else if(this.month != null && this.month != undefined){
      if(this.year == undefined){
        this.year = new Date().getFullYear();
      }      
      var startDate = new Date(this.year,this.month - 1,1);
      return startDate;
    }
    else if(this.year != null && this.year != undefined){
      var startDate = new Date(this.year,0,1);
      return startDate;
    }
    else{
      return "";
    }
  }

  getEndDate(){
    if(this.day != null && this.day != undefined){
      if(this.year == undefined){
        this.year = new Date().getFullYear();
      }
      if(this.month == undefined){
        this.month = new Date().getMonth() + 1;
      }
      var endDate = new Date(this.year,this.month - 1,this.day, 11, 59, 59);

      if(this.week){
        endDate = this.endOfWeek(endDate);
      }

      return endDate;
    }
    else if(this.month != null && this.month != undefined){
      if(this.year == undefined){
        this.year = new Date().getFullYear();
      }  
      var endDate = new Date(this.year,this.month - 1,this.daysInAMonth(), 11, 59, 59);
      return endDate;
    }
    else if(this.year != null && this.year != undefined){
      var endDate = new Date(this.year,11,31,11, 59, 59);
      return endDate;
    }
    else{
      return "";
    }
  }

  startOfWeek(date)
  {
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  endOfWeek(date)
  {
    return new Date(date.setDate(date.getDate() - date.getDay() + 6));
  }  

}

