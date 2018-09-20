import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentClass } from "../../classes/appointment-class";

/*
  Generated class for the PreferencesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PreferencesServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PreferencesServiceProvider Provider');
  }

  getColor(appointment): AppointmentClass {
    switch(appointment.status) {
      case 'Confirmada': {
        appointment.eventColor = '#3bdb01';
        break;
      }
      case 'Agendada': {
        appointment.eventColor = '#db5614';
        break;
      }
      case 'Cancelada': {
        appointment.eventColor = '#db1c2c';
        break;
      }
      default: {
        appointment.eventColor = '#4027db';
        break;
      }
    }
    return appointment;
  }
}
