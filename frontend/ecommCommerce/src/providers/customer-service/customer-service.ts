import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { CustomerClass } from "../../classes/customer-class";
import {of} from "rxjs/observable/of";
import { MessageServiceProvider } from "../message-service/message-service";
import { environment } from "../../environment";

/*
  Generated class for the CustomerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class CustomerServiceProvider {
  customerUrl = environment.baseUrl + '/clients';

  constructor(public http: HttpClient, private messageService: MessageServiceProvider) {
    console.log('Hello CustomerServiceProvider Provider');
  }

  private log(message: String) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getCustomers(): Observable<CustomerClass[]> {
    return this.http.get<CustomerClass[]>(this.customerUrl, httpOptions).pipe(
      catchError(this.handleError('getCustomers', []))
    );
  }

  searchCustomers(term: string): Observable<CustomerClass[]> {
    console.log('En Busqueda');
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<CustomerClass[]>(`${this.customerUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<CustomerClass[]>('searchCustomers', []))
    );
  }

  getCustomer(id: string): Observable<CustomerClass> {
    let _id = id;

    const url = `${this.customerUrl}/${id}`;
    console.log('URL:' + url);
    return this.http.get<CustomerClass>(url).pipe(
      tap(_ => this.log(`fetched customer id=${_id}`)),
      catchError(this.handleError<CustomerClass>(`getHero id=${_id}`))
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
