import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from "rxjs";
import { AppointmentClass } from "../../classes/appointment-class";
import { of } from "rxjs/observable/of";
import { MessageServiceProvider } from "../message-service/message-service";
import { environment } from "../../environment";
import { PreferencesServiceProvider } from "../preferences-service/preferences-service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
/*

/*
  Generated class for the ScheduleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ScheduleServiceProvider {
  appntUrl = environment.baseUrl + '/professionalsSchedule';

  constructor(public http: HttpClient, private messageService: MessageServiceProvider,
              public preferencesProvider: PreferencesServiceProvider) {
    console.log('Hello ScheduleServiceProvider Provider');
  }

  private log(message: String) {
    this.messageService.add(`AppointmentService: ${message}`);
  }

  getSchedule(professionaId): Observable<AppointmentClass[]> {
    return this.http.get<AppointmentClass[]>(this.appntUrl + '/' + professionaId).pipe(
      map(result => {
        const appointments = <AppointmentClass[]>result;
        appointments.forEach(appointment => {
          appointment.startTime = new Date(appointment.startTime);
          appointment.endTime = new Date(appointment.endTime);
          appointment = this.preferencesProvider.getColor(appointment);
          console.log('MapAgenda:' + JSON.stringify(appointment));
        })
        return appointments;
      })
    );
  }

  addScheduledAppnt (event: any): Observable<any> {
    console.log('Service: addScheduledAppointment:' + JSON.stringify(event));
    return this.http.post<any>(this.appntUrl + '/' , event, httpOptions).pipe(
      tap((event: any) => {
        console.log('EN POST');
        this.log(`added appointment w/ id=${event.id}`)
      }),
      catchError(this.handleError<AppointmentClass>('addAppointment'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
