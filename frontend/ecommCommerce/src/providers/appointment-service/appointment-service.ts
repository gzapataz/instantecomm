import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from "rxjs";
import { AppointmentClass } from "../../classes/appointment-class";
import { of } from "rxjs/observable/of";
import { MessageServiceProvider } from "../message-service/message-service";
import { environment } from "../../environment";

/*
  Generated class for the AppointmentServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class AppointmentServiceProvider {

  appntUrl = environment.baseUrl + '/professionalsSchedule';

  constructor(public http: HttpClient, private messageService: MessageServiceProvider) {
    console.log('Hello AppointmentServiceProvider Provider');
  }

  private log(message: String) {
    this.messageService.add(`AppointmentService: ${message}`);
  }

  /** POST: add a new Appointment to the server */
  addAppointment (event: AppointmentClass): Observable<AppointmentClass> {
    console.log('Service: addAppointment:' + JSON.stringify(event));
    return this.http.post<AppointmentClass>(this.appntUrl + '/appointment/', event, httpOptions).pipe(
      tap((event: AppointmentClass) => {
        console.log('EN POST');
        this.log(`added appointment w/ id=${event.idAppointment}`)
      }),
      catchError(this.handleError<AppointmentClass>('addAppointment'))
    );
  }

  /** PUT: update Appointment to the server */
  updateAppointment (event: AppointmentClass): Observable<AppointmentClass> {
    console.log('Service: addAppointment:' + JSON.stringify(event));
    return this.http.put<AppointmentClass>(this.appntUrl + '/appointment/', event, httpOptions).pipe(
      tap((event: AppointmentClass) => {
        console.log('EN POST');
        this.log(`added appointment w/ id=${event.idAppointment}`)
      }),
      catchError(this.handleError<AppointmentClass>('addAppointment'))
    );
  }

  getAppointment(): Observable<AppointmentClass[]> {
    return this.http.get<AppointmentClass[]>(this.appntUrl).pipe(
      catchError(this.handleError('getAppointments', []))
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
