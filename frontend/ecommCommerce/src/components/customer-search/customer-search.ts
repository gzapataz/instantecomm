import { Component, OnInit, Output, EventEmitter, Pipe  } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CustomerClass } from "../../classes/customer-class";
import { CustomerServiceProvider } from "../../providers/customer-service/customer-service";
import {ModalController} from "ionic-angular";
import {CustomerModalPage} from "../../pages/customer-modal/customer-modal";
import {LoggedProfessional} from "../../classes/logged-class";
import {GlobalsServiceProvider} from "../../providers/globals-service/globals-service";

// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
  name: 'RegexPipe'
})

/**
 * Generated class for the CustomerSearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'customer-search',
  templateUrl: 'customer-search.html'
})
export class CustomerSearchComponent implements OnInit {

  modal: any;
  found: boolean = false;
  openAlready: boolean = false;
  srcTitle = "Busqueda de Paciente"
  private searchTerms = new Subject<string>();
  public myInput: string;
  show = true;
  custId$: Observable<string>;
  myCustomers: CustomerClass[] = [];
  loggedUser: LoggedProfessional;

  @Output() messageEvent = new EventEmitter<CustomerClass>();


  constructor(private customerService: CustomerServiceProvider,
              private modalCtrl: ModalController,
              private globalService: GlobalsServiceProvider) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  //Filter de array based in the pattern args
  transform(value, args?) {
    // ES6 array destructuring
    let [pattern] = args;
    return value.filter(task => {
      console.log('CUSTOMERLIST:'+ JSON.stringify(task));
      let reg = new RegExp(pattern);
      console.log('FOUNDREG:'+ JSON.stringify(reg) + ' PATTER ' + pattern);
      let found = reg.test(task.person.personName.lastName);
      if (!found) {
        found = reg.test(task.person.personName.firstName);
      }
      console.log('FOUND:'+ JSON.stringify(found));
      return found;
    });
  }

  selectedName(id, name, customer) {
    console.log('Seleccionado:' + id + ' ');
    this.show = false;
    this.myInput = name;
    this.custId$ = id;
    this.messageEvent.emit(customer);

  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.customerService.searchCustomers(searchbar.target.value, this.loggedUser.userId).subscribe(customers => {

      this.myCustomers = customers;

      // set q to the value of the searchbar
      var q = searchbar.srcElement.value;


      // if the value is an empty string don't filter the items
      if (!q) {
        return;
      }
      console.log("Encontro clientes" + JSON.stringify(this.myCustomers))
      this.myCustomers = this.myCustomers.filter((v) => {
        if(v.person.personName.firstName && q ||v.person.personName.lastName && q) {
          if (v.person.personName.firstName.toLowerCase().indexOf(q.toLowerCase()) > -1||v.person.personName.lastName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      });

      console.log(q, this.myCustomers.length);
      if (this.myCustomers.length > 0) {
        this.found = true;
        this.modal = this.modalCtrl.create('CustomerModalPage', {customerList: this.myCustomers});
        this.modal.present();
        this.openAlready = true;
        this.modal.onDidDismiss(data => {
          if (data !== undefined) {
            this.selectedName(data._id, data.name, data);
          }
          this.openAlready = false;
        });
      }
      else {
        this.found = false;
      }
    });

  }

  onInput(ev: any) {
    console.log ('OnInput Search:' +ev.target.value);
    if (ev.target.value != undefined && ev.target.value !== '' && !this.openAlready) {
      this.customerService.searchCustomers(ev.target.value, this.loggedUser.userId).subscribe(customers => {
          this.getItems(ev);
        }, null);
    }
    else {
      console.log('Search Nulo');
      this.selectedName(undefined, undefined, undefined);
    }

  }

  onClear(ev: any) {
    console.log('Clear Fired');
    //this.myInput = undefined;
    this.messageEvent.emit(undefined);
  }

  onCancel(ev: any) {
    this.messageEvent.emit(undefined);
  }

  ngOnInit(): void {
    this.loggedUser = this.globalService.getLoggedProffessionalData();
  }
}
