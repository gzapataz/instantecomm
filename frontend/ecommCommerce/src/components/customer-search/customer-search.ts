import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CustomerClass } from "../../classes/customer-class";
import { CustomerServiceProvider } from "../../providers/customer-service/customer-service";
import {of} from "rxjs/observable/of";

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import {ModalController} from "ionic-angular";
import {CustomerModalPage} from "../../pages/customer-modal/customer-modal";

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
  openAlready: boolean = false;
  srcTitle = "Busqueda de Paciente"
  customers$: Observable<CustomerClass[]>;
  private searchTerms = new Subject<string>();
  public myInput: string;
  show = true;
  custId$: Observable<string>;
  customerTest = [];

  @Output() messageEvent = new EventEmitter<CustomerClass>();


  constructor(private customerService: CustomerServiceProvider,
              private modalCtrl: ModalController) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  selectedName(id, name, customer) {
    console.log('Seleccionado:' + id + ' ');
    this.show = false;
    this.myInput = name;
    this.custId$ = id;
    this.messageEvent.emit(customer);

  }

  onInput(ev: any) {
    console.log ('OnInput Search:' +ev.target.value);
    if (ev.target.value != undefined && ev.target.value !== '' && !this.openAlready) {
      this.customerService.searchCustomers(ev.target.value).subscribe(customers => {
          this.customerTest = customers;
          console.log('CusotmerOnInput:' + JSON.stringify(this.customerTest))
          this.modal = this.modalCtrl.create('CustomerModalPage', {customerList: this.customerTest});
          this.modal.present();
          this.openAlready = true;
          this.modal.onDidDismiss(data => {
            if (data !== undefined) {
              this.selectedName(data._id, data.name, data);
            }
            this.openAlready = false;
          });
        },
        null);
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

  ngOnInit(): void {
  }
}
