import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { MessageServiceProvider } from "../message-service/message-service";
import { environment } from "../../environment";
import {AppointmentClass} from "../../classes/appointment-class";

/*
  Generated class for the AppointmentServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


/*
  Generated class for the ExceptionServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExceptionServiceProvider {

  exceptionUrl = environment.baseUrl + '/professionals';

  constructor(public http: HttpClient, private messageService: MessageServiceProvider) {
    console.log('Hello ExceptionServiceProvider Provider');
  }

  private log(message: String) {
    this.messageService.add(`AppointmentService: ${message}`);
  }

  getException(professionalUID, startTime, endTime): Observable<any[]> {
    var finalURL = this.exceptionUrl + '/' + professionalUID + '/professionalsSchedule/exceptions/?startTime=' + startTime + '&' + 'endTime=' + endTime;
    return this.http.get<any[]>(finalURL).pipe(
      map(data => {
        return data;
      })
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
