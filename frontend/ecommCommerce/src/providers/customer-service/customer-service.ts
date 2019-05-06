import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { CustomerClass } from "../../classes/customer-class";
import { of } from "rxjs/observable/of";
import { MessageServiceProvider } from "../message-service/message-service";
import { environment } from "../../environment";
import { GlobalsServiceProvider } from "../globals-service/globals-service";

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
  customerUrl = environment.baseUrl + '/professionals/';

  constructor(public http: HttpClient, private messageService: MessageServiceProvider,
              private globalsServiceProvider: GlobalsServiceProvider) {
    //console.log('Hello CustomerServiceProvider Provider');
  }

  private log(message: String) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /* Gets customer Lists and also add them to the global array of customer for performance */
  getCustomers(professionalUID): Observable<CustomerClass[]> {
    var finalURL = this.customerUrl + professionalUID + '/clients/';
    //console.log('Customer-finalURL:' + finalURL);
    return this.http.get<CustomerClass[]>(finalURL, httpOptions).pipe(
      tap(data => this.globalsServiceProvider.setCustomerList(data)),
      catchError(this.handleError('getCustomers', []))
    );
  }

  searchCustomers(term: string, professionalUID): Observable<CustomerClass[]> {
    //console.log('En Busqueda:' + term);
    var q = term;
    console.log('Term:' + q)
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    var finalURL = this.customerUrl + professionalUID + '/clients/';
      return this.http.get<CustomerClass[]>(`${finalURL}`)
  }


  /*
searchCustomers(term: string, professionalUID): Observable<CustomerClass[]> {
    //console.log('En Busqueda:' + term);
    var q = term;
    console.log('Term:' + q)
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    var finalURL = this.customerUrl + professionalUID + '/clients/';
      return this.http.get<CustomerClass[]>(`${finalURL}`).pipe(


        tap( data => {
        data.filter( (v) => {
          if(v.person.personName.firstName && q ||v.person.personName.lastName && q) {
            if (v.person.personName.firstName.toLowerCase().indexOf(q.toLowerCase()) > -1||v.person.personName.lastName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
              console.log('Encontrado Term:' + JSON.stringify(v.person.personName))
              return true;
            }
          }
        });
          }
        ),
      catchError(this.handleError<CustomerClass[]>('searchCustomers', []))
    );
  }
 */


  getCustomer(id: string): Observable<CustomerClass> {
    let _id = id;
    const url = `${this.customerUrl}/${id}`;
    //console.log('Get Customer by Id URL:' + url);
    /* Fist query de customer in the local Array */
    let localList = this.globalsServiceProvider.getCustomerLocalList();
    //console.log('Local Customer by List:' + JSON.stringify(localList));
    let customerLocal = localList.find(customer => customer._id === id );
    //console.log('Local Customer Single:' + JSON.stringify(customerLocal));
    if (customerLocal) {
      var customerLocal$ = of(customerLocal)
      //console.log('Encontrado Cache' + JSON.stringify(customerLocal$));
      return customerLocal$;
    }

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
      //console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
