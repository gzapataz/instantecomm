import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CustomerModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-modal',
  templateUrl: 'customer-modal.html',
})
export class CustomerModalPage {

  customers = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController,
              ) {
    this.customers = this.navParams.get('customerList');
    console.log('Clientes: ' + JSON.stringify(this.customers[0]))
  }

  selectedName(id, name, customer) {
    customer.name = name;
    console.log('ReturnedCust:' + JSON.stringify(customer))
    this.viewCtrl.dismiss(customer);
    //this.show = false;
    //this.myInput = name;
    //this.custId$ = id;
    //this.messageEvent.emit(customer);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerModalPage');
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
