import { HttpClient } from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import { LoggedProfessional } from "../../classes/logged-class";
import { Observable } from "rxjs";
import { Storage } from "@ionic/storage";
import {CustomerClass} from "../../classes/customer-class";

/*
  Generated class for the GlobalsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalsServiceProvider implements OnInit {
  public loggedProfessional = new LoggedProfessional;
  public loadedCustomers: CustomerClass[];

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello GlobalsServiceProvider Provider');
    this.readFromStorageProfessionalData();
  }

  ngOnInit() {
    this.readFromStorageProfessionalData();

  }

  setProfessionalLoginData(UID, idSchedule, startHour, endHour) {
    this.loggedProfessional.userId = UID;
    this.loggedProfessional.idSchedule = idSchedule;
    this.loggedProfessional.startHour = startHour;
      this.loggedProfessional.endHour = endHour;
  }

  readFromStorageProfessionalData(): Promise<LoggedProfessional> {
    return new Promise((resolve, reject ) => {
        this.storage.ready().then(() => {
          this.storage.get('uid').then((uidData) => {
            this.loggedProfessional.userId = uidData
            //console.log('testing of sqlite was ' + uidData);
            this.storage.get('idSchedule').then(idSched => {
              this.loggedProfessional.idSchedule = idSched;
              resolve();
            })
          })
        });
    }).then(() => {return this.loggedProfessional},
      () => {return this.loggedProfessional}
      );
  }

  getLoggedProffessionalData(): LoggedProfessional {
    return this.loggedProfessional;
  }

  reSetProfessionalLoginData() {
    this.loggedProfessional.userId = '';
    this.loggedProfessional.idSchedule = '';
  }

  /* Guarda la lista de clientes de un profesional en el cache */

  getCustomerLocalList() {
    return this.loadedCustomers;
  }

  setCustomerList(customerList) {
    this.loadedCustomers = customerList;
    //console.log('Set Customer Global List:' + JSON.stringify(this.loadedCustomers));
  }
  resetCustomerList() {
    this.loadedCustomers = [];
  }
}
