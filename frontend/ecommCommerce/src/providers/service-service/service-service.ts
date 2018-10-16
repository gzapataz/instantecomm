import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { ServiceClass } from "../../classes/service-class";
import { MessageServiceProvider } from "../message-service/message-service";
import { environment } from "../../environment";

import { SERVICES } from '../../mock/services-mock';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/*
  Generated class for the ServiceServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceServiceProvider {

  //http[s]://url_servidor:[puerto]/professionals/:uid/services

  serviceUrl = environment.baseUrl + '/professionals';

  //serviceUrl = environment.baseUrl + '/services';


  constructor(public http: HttpClient, private messageService: MessageServiceProvider) {
    console.log('Hello ServiceServiceProvider Provider');
  }

  private log(message: String) {
    this.messageService.add(`ServicesService: ${message}`);
  }

  getServices(professionalUID): Observable<ServiceClass[]> {
   var finalURL = this.serviceUrl +  '/' + professionalUID + '/services';
   console.log('ServicesURL:' + finalURL);
   return this.http.get<ServiceClass[]>(finalURL,  httpOptions).pipe(
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
