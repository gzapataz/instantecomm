'use strict'


module.exports = class DateUtil {
  constructor(year, month, day) {
      this.year = year;
      this.month = month;
      this.day = day;
  }

  /**
   * Devuelve el número de días de un mes
   */
  daysInAMonth() {
      return new Date(this.year, this.month, 0).getDate();
  }

  getStartDate(){
    if((this.year != null && this.year != undefined) && (this.month != null && this.month != undefined) && (this.day != null && this.day != undefined)){
      var startDate = new Date(this.year,this.month - 1,this.day);
      return startDate;
    }
    else if((this.year != null && this.year != undefined) && (this.month != null && this.month != undefined)){
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
    if((this.year != null && this.year != undefined) && (this.month != null && this.month != undefined) && (this.day != null && this.day != undefined)){
      var endDate = new Date(this.year,this.month - 1,this.day, 11, 59, 59);
      return endDate;
    }
    else if((this.year != null && this.year != undefined) && (this.month != null && this.month != undefined)){
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

}