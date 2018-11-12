import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { ServiceClass } from "../../classes/service-class";
import { MessageServiceProvider } from "../message-service/message-service";
import { environment } from "../../environment";
import {AppointmentClass} from "../../classes/appointment-class";

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

  serviceUrl = environment.baseUrl + '/professionals';

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

  updateService(professionalUID, service) {
    var finalURL = this.serviceUrl +  '/' + professionalUID + '/services';
    console.log('Servicio AddService:' + finalURL)
    return this.http.put<ServiceClass>(finalURL, service, httpOptions).pipe(
      tap((service: ServiceClass) => {
        console.log('EN PUT');
        this.log(`updated Service w/ id=${service._id}`)
      }),
      catchError(this.handleError<ServiceClass>('updateService', new ServiceClass()))
    );
  }

  addService(professionalUID, service) {
    var finalURL = this.serviceUrl +  '/' + professionalUID + '/services';
    console.log('Servicio AddService:' + finalURL)
      return this.http.post<ServiceClass>(finalURL, service, httpOptions).pipe(
        tap((service: ServiceClass) => {
          console.log('EN POST');
          this.log(`added Service w/ id=${service._id}`)
        }),
        catchError(this.handleError<ServiceClass>('addService', new ServiceClass()))
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
