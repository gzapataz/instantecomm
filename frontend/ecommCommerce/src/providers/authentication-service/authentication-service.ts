import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalsServiceProvider } from "../../providers/globals-service/globals-service";
import { LoggedProfessional } from "../../classes/logged-class";


/*
  Generated class for the AuthenticationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationServiceProvider {

  loggedUser: LoggedProfessional ;

  constructor(public http: HttpClient,
              private globalService: GlobalsServiceProvider) {
    console.log('Hello AuthenticationServiceProvider Provider');
  }

  isAuthenticated() {
    this.loggedUser = this.globalService.getLoggedProffessionalData();
    if (this.loggedUser.userId === '' || this.loggedUser.userId == null) {
      return false;
    }
    return true;
  }

}
