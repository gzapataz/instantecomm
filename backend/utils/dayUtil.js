'use strict'

module.exports = class DayUtil {
  constructor(date) {
      this.date = date;
  }

  /**
   * Devuelve el día dada una fecha
   */
  getWeekDay() {
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[new Date(this.date).getDay()];
  }

}

