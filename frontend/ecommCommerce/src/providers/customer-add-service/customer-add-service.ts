import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { MessageServiceProvider } from "../message-service/message-service";
import { environment } from "../../environment";
import { Person } from "../../classes/customer-class";

/*
  Generated class for the CustomerAddServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class CustomerAddServiceProvider {

  appntUrl = environment.baseUrl + '/professionals';

  constructor(public http: HttpClient, private messageService: MessageServiceProvider) {
    console.log('Hello CustomerAddServiceProvider Provider');
  }

  private log(message: String) {
    this.messageService.add(`CustomerAddServiceProvider: ${message}`);
  }

  /** POST: add a new Customer to the server */
  addACustomer (event: Person,uid:string): Observable<Person> {
    console.log('Service: addACustomer POST:' + JSON.stringify(event) + ' UID: ' + uid);
    return this.http.post<Person>(this.appntUrl + '/'+uid+"/clients/", event, httpOptions).pipe(
      tap((event: Person) => {
        console.log('EN POST');
        this.log(`added appointment w/ id=${event._id}`)
      }),
      catchError(this.handleError<Person>('addACustomer'))
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
