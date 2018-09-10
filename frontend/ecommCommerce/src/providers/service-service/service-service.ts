import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { ServiceClass } from "../../classes/service-class";

import { SERVICES } from '../../mock/services-mock';


/*
  Generated class for the ServiceServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceServiceProvider {

  serviceUrl = 'api/services';

  constructor(public http: HttpClient) {
    console.log('Hello ServiceServiceProvider Provider');
  }

  getServices(): Observable<ServiceClass[]> {
    //return of (SERVICES);
   return this.http.get<ServiceClass[]>(this.serviceUrl).pipe(
      catchError(this.handleError('getServices', []))
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
